---
type: "query"
date: "2026-08-06T05:09:46.395608+00:00"
question: "Backup service restore contract"
contributor: "graphify"
source_nodes: ["backup.js", "server.js", "config.js"]
---

# Q: Backup service restore contract

## Answer

The service invokes pg_dump with -Fc, Docker defaults to PostgreSQL client 17, and exposes authenticated trigger/list/latest/stream endpoints plus unauthenticated health. Schedule remains 0 7 * * 1, with existing S3 key and 30-day retention.

## Source Nodes

- backup.js
- server.js
- config.js