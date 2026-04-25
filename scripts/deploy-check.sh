#!/bin/bash
# Pre-deploy validation for McLean Pool Services
# Usage: bash scripts/deploy-check.sh

ERRORS=0

echo "Running pre-deploy checks..."
echo "=============================="

# Check required files
for f in index.html netlify.toml package.json data/reviews.json data/services.json data/service-areas.json; do
  if [ ! -f "$f" ]; then
    echo "MISSING: $f"
    ERRORS=$((ERRORS + 1))
  fi
done

# Validate JSON files
for f in data/*.json; do
  if ! python3 -c "import json; json.load(open('$f'))" 2>/dev/null; then
    if ! node -e "JSON.parse(require('fs').readFileSync(#!/bin/bash
# ═══════════════════════════════════════════
# deploy-check.sh
# Pre-deploy validation script.
# Checks for required files and valid JSON.
#
# Usage: bash scripts/deploy-check.sh
# ═══════════════════════════════════════════

ERRORS=0

echo "Running pre-deploy checks..."

# Check required files exist
REQUIRED_FILES=("index.html" "netlify.toml" "data/reviews.json" "data/services.json" "assets/css/style.css" "assets/js/main.js")

for file in "${REQUIRED_FILES[@]}"; do
  if [ ! -f "$file" ]; then
    echo "MISSING: $file"
    ERRORS=$((ERRORS + 1))
  else
    echo "OK: $file"
  fi
done

# Validate JSON files
JSON_FILES=("data/reviews.json" "data/reviews-pending.json" "data/services.json" "data/service-areas.json")

for file in "${JSON_FILES[@]}"; do
  if [ -f "$file" ]; then
    if python3 -c "import json; json.load(open('$file'))" 2>/dev/null; then
      echo "VALID JSON: $file"
    else
      echo "INVALID JSON: $file"
      ERRORS=$((ERRORS + 1))
    fi
  fi
done

echo ""
if [ $ERRORS -eq 0 ]; then
  echo "All checks passed. Ready to deploy!"
  exit 0
else
  echo "$ERRORS error(s) found. Fix before deploying."
  exit 1
fi'$f','utf8'))" 2>/dev/null; then
      echo "INVALID JSON: $f"
      ERRORS=$((ERRORS + 1))
    fi
  fi
done

echo "=============================="
if [ $ERRORS -gt 0 ]; then
  echo "Deploy check FAILED with $ERRORS error(s)"
  exit 1
fi

echo "All checks passed!"
