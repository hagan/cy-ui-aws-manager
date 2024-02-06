#!/usr/bin/env bash

SCRIPT_DIR=$(cd -- "$(dirname -- "$0")" && pwd)

if command -v npm >/dev/null 2>&1; then
  if [ ! -d "$SCRIPT_DIR" ]; then
    echo "ERROR: 'SCRIPT_DIR=$SCRIPT_DIR' doesn't seem to exist!"
    exit 1
  fi
  pushd $SCRIPT_DIR > /dev/null
  TGZ_FILE=$(yarn pack | awk -F'"' '{print $2}' | awk -F'/' '{print $NF}' | grep -Ev "^#|^$")
  if [ -z "${TGZ_FILE}" ]; then
    echo "ERROR: No tgz file generated: '${TGZ_FILE}'"
    exit 1
  elif [ ! -f "${TGZ_FILE}" ] || [ ! -d "${SCRIPT_DIR}/dist" ]; then
    echo "ERROR: Couldn't move ./${TGZ_FILE}, either file or destination doesn't exist."
    exit 1
  else
    mv ./${TGZ_FILE} $SCRIPT_DIR/dist/.
    echo "${TGZ_FILE} moved to $SCRIPT_DIR/dist/."
  fi
  popd > /dev/null
else
  echo "ERROR: missing npm/node!"
  exit 1
fi
