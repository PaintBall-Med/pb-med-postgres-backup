# pb-med-postgres-backup

Microservicio de backups PostgreSQL para Paintball Medellin. Genera dumps comprimidos de la DB de produccion, los sube a un Railway Bucket S3 y expone endpoints HTTP para descarga manual.

## Endpoints

| Metodo | Ruta | Auth | Descripcion |
|--------|------|------|-------------|
| GET | `/backup` | Bearer TOKEN | Stream pg_dump directo |
| POST | `/backup/trigger` | Bearer TOKEN | Genera backup, sube al bucket, ejecuta limpieza |
| GET | `/backup/latest` | Bearer TOKEN | 302 redirect a presigned URL (1h) |
| GET | `/backup/list` | Bearer TOKEN | JSON con backups disponibles |
| DELETE | `/backup/cleanup` | Bearer TOKEN | Fuerza limpieza de backups viejos |
| GET | `/health` | Ninguna | Status del servicio |

## Modos de operacion

- **`MODE=server`** (default): API HTTP con Express. Ideal para descargas manuales + Serverless en Railway.
- **`MODE=cron`**: Ejecuta un backup, sube al bucket, limpia archivos viejos y termina. Para Railway native cron.

## Uso

```bash
# Descarga directa
curl -H "Authorization: Bearer $TOKEN" https://YOUR_DOMAIN/backup -o backup.dump

# Trigger backup al bucket
curl -X POST -H "Authorization: Bearer $TOKEN" https://YOUR_DOMAIN/backup/trigger

# Descargar ultimo backup
curl -H "Authorization: Bearer $TOKEN" https://YOUR_DOMAIN/backup/latest -L -o latest.dump

# Restaurar localmente
pg_restore -d "postgresql://localhost/pb_local" --no-owner --no-acl backup.dump
```

## Variables de entorno

Ver `.env.example` para la lista completa.

## Deploy en Railway

1. Crear bucket `pb-med-backups` en Railway dashboard
2. Crear servicio desde este repo
3. Configurar variables (ver plan en Jira SCRUM-318)
4. Generar dominio publico
5. Habilitar Serverless
