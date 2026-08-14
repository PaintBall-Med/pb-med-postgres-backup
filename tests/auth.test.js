import assert from 'node:assert/strict'
import test from 'node:test'

const TOKEN = 'test-secret-token-de-16'

process.env.DATABASE_URL ??= 'postgresql://user:pass@localhost:5432/db'
process.env.AWS_ACCESS_KEY_ID ??= 'test-access-key'
process.env.AWS_SECRET_ACCESS_KEY ??= 'test-secret-key'
process.env.S3_BUCKET ??= 'pb-med-backups-test'
process.env.SECRET_TOKEN = TOKEN
process.env.PORT = '0'

const { startServer } = await import('../src/server.js')

const { server, cronTask } = startServer()
await new Promise((resolve) => server.once('listening', resolve))
const baseUrl = `http://127.0.0.1:${server.address().port}`

test.after(async () => {
  await cronTask?.destroy?.()
  server.close()
})

test('/health responde sin token', async () => {
  const res = await fetch(`${baseUrl}/health`)
  assert.equal(res.status, 200)
  const body = await res.json()
  assert.equal(body.status, 'ok')
  assert.equal(body.mode, 'server')
})

test('las rutas protegidas rechazan la petición sin token', async () => {
  for (const [method, route] of [
    ['GET', '/backup'],
    ['POST', '/backup/trigger'],
    ['GET', '/backup/latest'],
    ['GET', '/backup/list'],
    ['DELETE', '/backup/cleanup'],
  ]) {
    const res = await fetch(`${baseUrl}${route}`, { method })
    assert.equal(res.status, 401, `${method} ${route} debería exigir token`)
    assert.deepEqual(await res.json(), { error: 'Missing token' })
  }
})

test('rechaza un token de largo distinto sin romper timingSafeEqual', async () => {
  const res = await fetch(`${baseUrl}/backup/list`, {
    headers: { authorization: 'Bearer corto' },
  })
  assert.equal(res.status, 403)
  assert.deepEqual(await res.json(), { error: 'Invalid token' })
})

test('rechaza un token del mismo largo pero distinto', async () => {
  const sameLength = `${'x'.repeat(TOKEN.length - 1)}y`
  assert.equal(sameLength.length, TOKEN.length)
  const res = await fetch(`${baseUrl}/backup/list`, {
    headers: { authorization: `Bearer ${sameLength}` },
  })
  assert.equal(res.status, 403)
})

test('acepta el token válido por header y por query string', async () => {
  // La ruta pega contra S3 y sin credenciales reales falla, pero lo que se
  // verifica acá es que el middleware deja pasar: nunca 401 ni 403.
  const viaHeader = await fetch(`${baseUrl}/backup/list`, {
    headers: { authorization: `Bearer ${TOKEN}` },
  })
  assert.ok(![401, 403].includes(viaHeader.status), `header rechazado: ${viaHeader.status}`)

  const viaQuery = await fetch(`${baseUrl}/backup/list?token=${encodeURIComponent(TOKEN)}`)
  assert.ok(![401, 403].includes(viaQuery.status), `query rechazado: ${viaQuery.status}`)
})
