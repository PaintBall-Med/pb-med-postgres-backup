# Graph Report - pb-med-postgres-backup  (2026-08-14)

## Corpus Check
- 18 files · ~4,782 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 115 nodes · 125 edges · 14 communities (11 shown, 3 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ee279f63`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- server.js
- pb-med-postgres-backup — CLAUDE.md
- package.json
- pb-med-postgres-backup
- Backup Operations — pb-med-postgres-backup
- dependencies
- Graphify Explorer Pro — pb-med-postgres-backup (Ops)
- Operaciones
- Campaigns CRM — contrato de restore del servicio de backups
- Q: Backup service restore contract
- config.test.js
- graphify-post-commit.sh
- graphify-session-context.sh
- install-graphify-pro.sh

## God Nodes (most connected - your core abstractions)
1. `pb-med-postgres-backup — CLAUDE.md` - 14 edges
2. `pb-med-postgres-backup` - 10 edges
3. `Operaciones` - 8 edges
4. `Backup Operations — pb-med-postgres-backup` - 7 edges
5. `Graphify Explorer Pro — pb-med-postgres-backup (Ops)` - 7 edges
6. `config` - 5 edges
7. `dumpAndUpload()` - 4 edges
8. `runScheduledBackup()` - 4 edges
9. `scripts` - 4 edges
10. `Troubleshooting` - 4 edges

## Surprising Connections (you probably didn't know these)
- `runScheduledBackup()` --calls--> `dumpAndUpload()`  [EXTRACTED]
  src/server.js → src/backup.js
- `runScheduledBackup()` --calls--> `cleanOldBackups()`  [EXTRACTED]
  src/server.js → src/retention.js

## Import Cycles
- None detected.

## Communities (14 total, 3 thin omitted)

### Community 0 - "server.js"
Cohesion: 0.17
Nodes (16): buildKey(), dumpAndUpload(), getLatestBackupUrl(), listBackups(), s3, streamDump(), config, missing (+8 more)

### Community 1 - "pb-med-postgres-backup — CLAUDE.md"
Cohesion: 0.13
Nodes (14): Arquitectura, Comandos, Convenciones de código, Cron schedule, Estructura, Formato de backup, Infraestructura Railway, Modos de operación (+6 more)

### Community 2 - "package.json"
Cohesion: 0.20
Nodes (9): description, main, name, scripts, dev, start, test, type (+1 more)

### Community 3 - "pb-med-postgres-backup"
Cohesion: 0.18
Nodes (10): Arquitectura, Deploy en Railway, Desarrollo local, Endpoints, Jira, pb-med-postgres-backup, Restaurar backup, Stack (+2 more)

### Community 4 - "Backup Operations — pb-med-postgres-backup"
Cohesion: 0.20
Nodes (9): 502 en health, Backup Operations — pb-med-postgres-backup, Backup timeout, Cambiar schedule, Informacion del servicio, Obtener SECRET_TOKEN, pg_dump version mismatch, Troubleshooting (+1 more)

### Community 5 - "dependencies"
Cohesion: 0.22
Nodes (9): @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, express, dependencies, @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, express, node-cron (+1 more)

### Community 6 - "Graphify Explorer Pro — pb-med-postgres-backup (Ops)"
Cohesion: 0.25
Nodes (7): Cuándo invocar, Formato de reporte, Graphify Explorer Pro — pb-med-postgres-backup (Ops), Instrucciones, Prerequisito, Repos relacionados, Restricciones

### Community 7 - "Operaciones"
Cohesion: 0.25
Nodes (8): Descargar ultimo backup, Forzar limpieza, Health check (sin auth), Listar backups, Operaciones, Restaurar backup localmente, Stream directo de pg_dump, Trigger backup manual

### Community 8 - "Campaigns CRM — contrato de restore del servicio de backups"
Cohesion: 0.40
Nodes (4): Campaigns CRM — contrato de restore del servicio de backups, Límite de responsabilidad, Propiedades verificables, Superficie operativa

### Community 9 - "Q: Backup service restore contract"
Cohesion: 0.50
Nodes (3): Answer, Q: Backup service restore contract, Source Nodes

### Community 10 - "config.test.js"
Cohesion: 0.50
Nodes (4): execFileAsync, loadConfig(), root, VALID_ENV

## Knowledge Gaps
- **69 isolated node(s):** `graphify-session-context.sh script`, `install-graphify-pro.sh script`, `s3`, `missing`, `required` (+64 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `Backup Operations — pb-med-postgres-backup` connect `Backup Operations — pb-med-postgres-backup` to `Operaciones`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **What connects `graphify-session-context.sh script`, `install-graphify-pro.sh script`, `s3` to the rest of the system?**
  _69 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `pb-med-postgres-backup — CLAUDE.md` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._