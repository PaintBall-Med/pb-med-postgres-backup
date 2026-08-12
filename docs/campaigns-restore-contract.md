# Campaigns CRM — contrato de restore del servicio de backups

Este documento fija el contrato operativo entre
`pb-med-postgres-backup` y el check de restore del backend. No cambia el
schedule, el formato, la key S3, la retención ni las variables secretas del
servicio.

## Propiedades verificables

- `src/backup.js` invoca `pg_dump` con `-Fc`, por lo que cada archivo es un
  dump custom PostgreSQL con extensión `.dump`.
- `Dockerfile` instala el cliente PostgreSQL 17 (`PG_VERSION=17`).
- `config.js` conserva `CRON_SCHEDULE` por defecto en `0 7 * * 1`.
- La key sigue siendo
  `{BUCKET_SUBFOLDER}{BACKUP_FILE_PREFIX}-{timestamp}.dump`.
- La retención sigue siendo `BACKUP_RETENTION_DAYS`, con valor por defecto de
  30 días.
- El despliegue continúa siendo un servicio persistente con API y cron
  interno; no se habilita Serverless.

Las tablas Campaigns se incluyen automáticamente porque el dump es completo;
el servicio no mantiene una allowlist separada de tablas Campaigns.

## Superficie operativa

El servicio mantiene estos usos:

- `GET /health`: health y estadísticas agregadas, sin autenticación;
- `POST /backup/trigger`: dispara un dump y la limpieza normal;
- `GET /backup/list`: lista objetos disponibles;
- `GET /backup/latest`: redirige a una URL firmada de descarga;
- `GET /backup`: transmite un dump nuevo;
- `DELETE /backup/cleanup`: ejecuta la limpieza configurada.

Las operaciones autenticadas reciben el token mediante el mecanismo seguro
del entorno de despliegue. Nunca escribir el token, una URL firmada o valores
de credenciales en logs, documentación, tickets o capturas.

## Límite de responsabilidad

Este microservicio solo genera, almacena, lista y descarga dumps. No ejecuta
`pg_restore`, no aplica `prisma migrate deploy`, no valida el esquema
Campaigns y no realiza rollback.

Después de restaurar un dump en una base aislada, el operador debe:

1. validar el inventario con `pg_restore --list` sin restaurar a la base
   fuente;
2. aplicar el historial formal con `prisma migrate deploy` en el checkout
   aprobado;
3. ejecutar `npm run db:campaigns:backup-check` contra el destino aislado;
4. conservar solo la evidencia de conteos/códigos, sin filas, PII,
   `secretRef`, `fingerprint` ni metadata de secretos.

El check externo es, por diseño, post-restore. Un health `ok` del
microservicio confirma disponibilidad operativa y estadísticas del bucket;
no confirma que una base Campaigns haya sido restaurada ni migrada.
