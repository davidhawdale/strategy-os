#!/bin/bash
# sync-register.sh — Syncs strategy files to dashboard/public/ as JSON
#
# Parses:
#   strategy/hypotheses.md  -> tools/dashboard/public/register.json
#   strategy/gap-analysis.md -> tools/dashboard/public/gap-analysis.json (optional)
#
# Usage:
#   ./tools/scripts/sync-register.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

HYPOTHESES_PATH="$PROJECT_ROOT/strategy/hypotheses.md"
GAP_ANALYSIS_PATH="$PROJECT_ROOT/strategy/gap-analysis.md"
REGISTER_OUTPUT="$PROJECT_ROOT/tools/dashboard/public/register.json"
GAP_ANALYSIS_OUTPUT="$PROJECT_ROOT/tools/dashboard/public/gap-analysis.json"

if [ ! -f "$HYPOTHESES_PATH" ]; then
  echo "ERROR: $HYPOTHESES_PATH not found" >&2
  exit 1
fi

echo "Parsing hypothesis register..."

cd "$PROJECT_ROOT/tools/dashboard"

npx tsx -e "
import { parse } from './src/parser/index.ts';
import { readFileSync, writeFileSync } from 'fs';

const md = readFileSync('$HYPOTHESES_PATH', 'utf-8');
const result = parse(md);

writeFileSync('$REGISTER_OUTPUT', JSON.stringify(result, null, 2));

const completeness = Math.round(result.parseCompleteness * 100);
console.log('Register parse completeness: ' + completeness + '%');
console.log('Register warnings: ' + result.warnings.length);
console.log('Written to $REGISTER_OUTPUT');
"

echo "Register: $(wc -c < "$REGISTER_OUTPUT") bytes"

# Parse gap analysis (optional)
if [ -f "$GAP_ANALYSIS_PATH" ]; then
  echo ""
  echo "Parsing gap analysis..."

  npx tsx -e "
import { parseGapAnalysis } from './src/parser/gap-analysis.ts';
import { readFileSync, writeFileSync } from 'fs';

const md = readFileSync('$GAP_ANALYSIS_PATH', 'utf-8');
const result = parseGapAnalysis(md);

writeFileSync('$GAP_ANALYSIS_OUTPUT', JSON.stringify(result, null, 2));

const completeness = Math.round(result.parseCompleteness * 100);
console.log('Gap analysis parse completeness: ' + completeness + '%');
console.log('Gap analysis warnings: ' + result.warnings.length);
console.log('Written to $GAP_ANALYSIS_OUTPUT');
"

  echo "Gap analysis: $(wc -c < "$GAP_ANALYSIS_OUTPUT") bytes"
else
  echo ""
  echo "No gap-analysis.md found at $GAP_ANALYSIS_PATH — skipping gap analysis parse."
  echo "(Gap Definer has not run yet, or file does not exist.)"
fi

echo ""
echo "Done."
