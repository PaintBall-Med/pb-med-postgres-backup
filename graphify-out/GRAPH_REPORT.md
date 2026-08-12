# Graph Report - pb-med-postgres-backup  (2026-08-06)

## Corpus Check
- 12 files · ~3,430 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 99 nodes · 107 edges · 10 communities
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ee33f773`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Operaciones
- Campaigns CRM — contrato de restore del servicio de backups
- Q: Backup service restore contract

## God Nodes (most connected - your core abstractions)
1. `pb-med-postgres-backup — CLAUDE.md` - 14 edges
2. `pb-med-postgres-backup` - 10 edges
3. `Operaciones` - 8 edges
4. `Graphify Explorer Pro — pb-med-postgres-backup (Ops)` - 7 edges
5. `Backup Operations — pb-med-postgres-backup` - 7 edges
6. `config` - 5 edges
7. `dumpAndUpload()` - 4 edges
8. `Troubleshooting` - 4 edges
9. `Campaigns CRM — contrato de restore del servicio de backups` - 4 edges
10. `scripts` - 3 edges

## Surprising Connections (you probably didn't know these)
- `startServer()` --calls--> `dumpAndUpload()`  [EXTRACTED]
  src/server.js → src/backup.js
- `startServer()` --calls--> `cleanOldBackups()`  [EXTRACTED]
  src/server.js → src/retention.js

## Import Cycles
- None detected.

## Communities (10 total, 0 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.18
Nodes (14): buildKey(), dumpAndUpload(), getLatestBackupUrl(), listBackups(), s3, streamDump(), config, missing (+6 more)

### Community 1 - "Community 1"
Cohesion: 0.13
Nodes (14): Arquitectura, Comandos, Convenciones de código, Cron schedule, Estructura, Formato de backup, Infraestructura Railway, Modos de operación (+6 more)

### Community 2 - "Community 2"
Cohesion: 0.22
Nodes (8): description, main, name, scripts, dev, start, type, version

### Community 3 - "Community 3"
Cohesion: 0.18
Nodes (10): Arquitectura, Deploy en Railway, Desarrollo local, Endpoints, Jira, pb-med-postgres-backup, Restaurar backup, Stack (+2 more)

### Community 4 - "Community 4"
Cohesion: 0.20
Nodes (9): 502 en health, Backup Operations — pb-med-postgres-backup, Backup timeout, Cambiar schedule, Informacion del servicio, Obtener SECRET_TOKEN, pg_dump version mismatch, Troubleshooting (+1 more)

### Community 5 - "Community 5"
Cohesion: 0.22
Nodes (9): @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, express, node-cron, dependencies, @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, express (+1 more)

### Community 6 - "Community 6"
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

## Knowledge Gaps
- **63 isolated node(s):** `name`, `version`, `description`, `type`, `main` (+58 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Backup Operations — pb-med-postgres-backup` connect `Community 4` to `Operaciones`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Community 5` to `Community 2`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `Operaciones` connect `Operaciones` to `Community 4`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _63 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._