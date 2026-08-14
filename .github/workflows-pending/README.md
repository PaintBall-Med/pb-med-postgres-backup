# Workflows pendientes de activar

El repo no tenía CI. `ci.yml` es el workflow nuevo y está acá y no en
`.github/workflows/` porque la sesión que lo escribió no tiene el scope
`workflow` de GitHub: cualquier push que toque `.github/workflows/**` es
rechazado por la API. La activación es un `git mv` que hay que correr desde una
cuenta con permiso sobre workflows.

## Activar

```bash
mkdir -p .github/workflows
git mv .github/workflows-pending/ci.yml .github/workflows/ci.yml
git rm .github/workflows-pending/README.md
git commit -m "ci: activar el workflow del servicio de backups"
git push
```

## Qué corre

Sobre PRs y pushes a `main` y `devqatesting`:

| Job | Qué verifica |
| --- | --- |
| `tests` | Los 11 tests de `node:test` (validación de `config.js` y el middleware de auth) |
| `docker` | Build de la imagen, que traiga `pg_dump 17` y que el modo cron falle limpio si faltan credenciales |

La verificación de `pg_dump 17` importa porque el dump depende de ese binario
dentro de la imagen: si el paquete de Alpine cambia de nombre o desaparece, el
`Dockerfile` cae al fallback `postgresql-client` y el backup se generaría con
una versión que `pg_restore` de producción puede rechazar.
