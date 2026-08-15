#!/usr/bin/env bash
# PB-Med Graphify Pro — post-commit steps (global sync, visualizations, memory dir)
# Invocado desde .git/hooks/post-commit tras el rebuild de graphify.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$REPO_ROOT"

TAG="${GRAPHIFY_REPO_TAG:-b-pb-med}"
LOG="${GRAPHIFY_REBUILD_LOG:-$HOME/.cache/graphify-rebuild.log}"
mkdir -p "$(dirname "$LOG")"

log() { echo "[graphify pro $TAG] $*" >> "$LOG"; }

# Esperar a que termine el rebuild async de graphify (máx 10 min)
for _ in $(seq 1 120); do
  if ! pgrep -f "graphify.watch.*_rebuild_code" >/dev/null 2>&1; then
    break
  fi
  sleep 5
done

[ -f graphify-out/graph.json ] || { log "skip: no graph.json"; exit 0; }

mkdir -p graphify-out/memory

log "global add --as $TAG"
graphify global add graphify-out/graph.json --as "$TAG" >> "$LOG" 2>&1 || log "global add failed"

log "export callflow-html"
graphify export callflow-html >> "$LOG" 2>&1 || log "callflow export failed"

log "tree"
graphify tree \
  --graph graphify-out/graph.json \
  --output graphify-out/GRAPH_TREE.html \
  --label "$TAG" >> "$LOG" 2>&1 || log "tree failed"

log "done"
