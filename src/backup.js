import { spawn } from 'node:child_process'
import { createWriteStream, createReadStream, statSync, unlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createGzip } from 'node:zlib'
import { pipeline } from 'node:stream/promises'
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { config } from './config.js'

const s3 = new S3Client({
  region: config.s3.region,
  endpoint: config.s3.endpoint,
  credentials: {
    accessKeyId: config.s3.accessKeyId,
    secretAccessKey: config.s3.secretAccessKey,
  },
  forcePathStyle: false,
})

function buildKey(timestamp) {
  const ts = timestamp.replace(/[:.]/g, '-')
  return `${config.backup.subfolder}${config.backup.filePrefix}-${ts}.dump`
}

export async function dumpAndUpload() {
  const timestamp = new Date().toISOString()
  const key = buildKey(timestamp)
  const tmpFile = join(tmpdir(), `pg-backup-${Date.now()}.dump`)

  await new Promise((resolve, reject) => {
    const pg = spawn('pg_dump', [config.databaseUrl, '--no-password', '-Fc'], {
      stdio: ['ignore', 'pipe', 'pipe'],
    })

    const out = createWriteStream(tmpFile)
    pg.stdout.pipe(out)

    let stderr = ''
    pg.stderr.on('data', (chunk) => {
      stderr += chunk.toString()
    })

    pg.on('close', (code) => {
      if (code !== 0) return reject(new Error(`pg_dump exited ${code}: ${stderr}`))
      resolve()
    })
    pg.on('error', reject)
  })

  const stat = statSync(tmpFile)
  const body = createReadStream(tmpFile)

  await s3.send(
    new PutObjectCommand({
      Bucket: config.s3.bucket,
      Key: key,
      Body: body,
      ContentType: 'application/octet-stream',
    })
  )

  unlinkSync(tmpFile)

  console.log(`Backup uploaded: ${key} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`)
  return { key, size: stat.size, timestamp }
}

export function streamDump(res) {
  res.setHeader('Content-Type', 'application/octet-stream')
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${config.backup.filePrefix}-${new Date().toISOString().replace(/[:.]/g, '-')}.dump"`
  )

  const pg = spawn('pg_dump', [config.databaseUrl, '--no-password', '-Fc'], {
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  pg.stdout.pipe(res)

  pg.stderr.on('data', (chunk) => console.error(`pg_dump stderr: ${chunk}`))

  pg.on('error', (err) => {
    console.error('pg_dump spawn error:', err.message)
    if (!res.headersSent) res.status(500).json({ error: 'pg_dump failed to start' })
  })

  pg.on('close', (code) => {
    if (code !== 0) console.error(`pg_dump exited with code ${code}`)
  })

  res.on('close', () => {
    if (!pg.killed) pg.kill()
  })
}

export async function listBackups() {
  const prefix = `${config.backup.subfolder}${config.backup.filePrefix}`
  const result = await s3.send(
    new ListObjectsV2Command({
      Bucket: config.s3.bucket,
      Prefix: prefix,
    })
  )

  const items = (result.Contents || [])
    .map((obj) => ({
      key: obj.Key,
      size: obj.Size,
      lastModified: obj.LastModified,
    }))
    .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified))

  return items
}

export async function getLatestBackupUrl() {
  const items = await listBackups()
  if (!items.length) return null

  const url = await getSignedUrl(
    s3,
    new GetObjectCommand({ Bucket: config.s3.bucket, Key: items[0].key }),
    { expiresIn: 3600 }
  )
  return { url, key: items[0].key, size: items[0].size }
}
