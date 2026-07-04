# Graph Report - pb-med-postgres-backup  (2026-07-04)

## Corpus Check
- 10 files · ~2,993 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 86 nodes · 94 edges · 7 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `677b3aa4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]

## God Nodes (most connected - your core abstractions)
1. `pb-med-postgres-backup — CLAUDE.md` - 14 edges
2. `pb-med-postgres-backup` - 10 edges
3. `Operaciones` - 8 edges
4. `Graphify Explorer Pro — pb-med-postgres-backup (Ops)` - 7 edges
5. `Backup Operations — pb-med-postgres-backup` - 7 edges
6. `config` - 5 edges
7. `Troubleshooting` - 4 edges
8. `scripts` - 3 edges
9. `dumpAndUpload()` - 3 edges
10. `listBackups()` - 3 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (7 total, 0 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.17
Nodes (13): buildKey(), dumpAndUpload(), getLatestBackupUrl(), listBackups(), s3, streamDump(), config, missing (+5 more)

### Community 1 - "Community 1"
Cohesion: 0.13
Nodes (14): Arquitectura, Comandos, Convenciones de código, Cron schedule, Estructura, Formato de backup, Infraestructura Railway, Modos de operación (+6 more)

### Community 2 - "Community 2"
Cohesion: 0.14
Nodes (13): dependencies, @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, express, node-cron, description, main, name (+5 more)

### Community 3 - "Community 3"
Cohesion: 0.18
Nodes (10): Arquitectura, Deploy en Railway, Desarrollo local, Endpoints, Jira, pb-med-postgres-backup, Restaurar backup, Stack (+2 more)

### Community 4 - "Community 4"
Cohesion: 0.20
Nodes (9): 502 en health, Backup Operations — pb-med-postgres-backup, Backup timeout, Cambiar schedule, Informacion del servicio, Obtener SECRET_TOKEN, pg_dump version mismatch, Troubleshooting (+1 more)

### Community 5 - "Community 5"
Cohesion: 0.25
Nodes (7): Cuándo invocar, Formato de reporte, Graphify Explorer Pro — pb-med-postgres-backup (Ops), Instrucciones, Prerequisito, Repos relacionados, Restricciones

### Community 6 - "Community 6"
Cohesion: 0.25
Nodes (8): Descargar ultimo backup, Forzar limpieza, Health check (sin auth), Listar backups, Operaciones, Restaurar backup localmente, Stream directo de pg_dump, Trigger backup manual

## Knowledge Gaps
- **58 isolated node(s):** `name`, `version`, `description`, `type`, `main` (+53 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Backup Operations — pb-med-postgres-backup` connect `Community 4` to `Community 6`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `Operaciones` connect `Community 6` to `Community 4`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _58 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._