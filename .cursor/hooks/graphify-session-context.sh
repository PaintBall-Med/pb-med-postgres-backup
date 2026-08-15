#!/usr/bin/env bash
# Fail-open: inyecta contexto Graphify Pro al iniciar sesión
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
GRAPH_JSON="$REPO_ROOT/graphify-out/graph.json"
GLOBAL_GRAPH="$HOME/.graphify/global-graph.json"
REPO_TAG="pb-med-postgres-backup"

parts=()

if [[ -f "$GRAPH_JSON" ]]; then
  nodes=$(python3 -c "import json; g=json.load(open('$GRAPH_JSON')); print(len(g.get('nodes', g.get('graph',{}).get('nodes',[]))))" 2>/dev/null || echo "?")
  parts+=("[Graphify Pro $REPO_TAG] Grafo local: $nodes nodos en graphify-out/")
else
  parts+=("[Graphify Pro $REPO_TAG] Grafo local NO generado. Ejecutar: set -a && source .env && set +a && graphify extract . --backend openai")
fi

if [[ -f "$GLOBAL_GRAPH" ]]; then
  global_nodes=$(python3 -c "import json; g=json.load(open('$GLOBAL_GRAPH')); print(len(g.get('nodes', g.get('graph',{}).get('nodes',[]))))" 2>/dev/null || echo "?")
  parts+=("Global graph: $global_nodes nodos (~/.graphify/global-graph.json)")
fi

parts+=("Skill: .cursor/skills/graphify-codebase/SKILL.md | Subagent: graphify-explorer")

ctx=$(IFS=' | '; echo "${parts[*]}")
python3 -c "import json; print(json.dumps({'additional_context': '''$ctx'''}))" 2>/dev/null || echo "{\"additional_context\": \"$ctx\"}"
exit 0
