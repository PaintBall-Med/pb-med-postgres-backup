#!/usr/bin/env bash
# Instala los pasos Graphify Pro en el hook post-commit local de este repo.
# Ejecutar una vez por repo: bash .cursor/hooks/install-graphify-pro.sh
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$REPO_ROOT"

TAG="$(basename "$REPO_ROOT")"
[[ "$TAG" == "PB-IA" ]] && TAG="PB-IA"

chmod +x .cursor/hooks/graphify-post-commit.sh

HOOK=".git/hooks/post-commit"
if [[ ! -f "$HOOK" ]]; then
  echo "No existe $HOOK — ejecuta primero: graphify hook install"
  exit 1
fi

if grep -q "graphify-post-commit.sh" "$HOOK"; then
  echo "Ya instalado en $HOOK"
  exit 0
fi

cat >> "$HOOK" <<EOF

# pb-med graphify pro post-steps
if [ -x ".cursor/hooks/graphify-post-commit.sh" ]; then
  GRAPHIFY_REPO_TAG="$TAG" nohup .cursor/hooks/graphify-post-commit.sh >/dev/null 2>&1 &
fi
EOF

echo "Instalado Graphify Pro en $HOOK (tag: $TAG)"
