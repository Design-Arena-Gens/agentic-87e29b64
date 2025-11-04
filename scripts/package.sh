#!/usr/bin/env bash
set -euo pipefail

mkdir -p build
ARCHIVE_PATH="build/education-portal.tar.gz"
rm -f "$ARCHIVE_PATH"
tar --exclude="node_modules" \
    --exclude=".next" \
    --exclude=".git" \
    --exclude="terminals" \
    --exclude="build" \
    -czf "$ARCHIVE_PATH" .

echo "Packaged at $ARCHIVE_PATH"
