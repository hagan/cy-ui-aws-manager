#!/usr/bin/env sh

SCRIPT_DIR=$(cd -- "$(dirname -- "$0")" && pwd)

if command -v poetry >/dev/null 2>&1; then
  echo "SCRIPT_DIR: $SCRIPT_DIR"
  if [ ! -d "$SCRIPT_DIR" ]; then
    echo "ERROR: 'SCRIPT_DIR=$SCRIPT_DIR' doesn't seem to exist!"
    exit 1
  fi
  cd $SCRIPT_DIR \
  && npm pack --pack-destination $SCRIPT_DIR/dist \
  && echo "Done."
fi