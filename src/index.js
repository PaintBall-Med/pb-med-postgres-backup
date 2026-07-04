import { config } from './config.js'

console.log(`pb-med-postgres-backup v1.0.0 | mode=${config.mode}`)

if (config.mode === 'cron') {
  const { dumpAndUpload } = await import('./backup.js')
  const { cleanOldBackups } = await import('./retention.js')

  try {
    const result = await dumpAndUpload()
    console.log(`Cron backup complete: ${result.key} (${(result.size / 1024 / 1024).toFixed(2)} MB)`)
    const cleanup = await cleanOldBackups()
    console.log(`Cleanup: ${cleanup.deleted} deleted, ${cleanup.remaining} remaining`)
    process.exit(0)
  } catch (err) {
    console.error('Cron backup failed:', err.message)
    process.exit(1)
  }
} else {
  const { startServer } = await import('./server.js')
  startServer()
}
