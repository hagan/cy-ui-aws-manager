#!/usr/bin/env bash

SCRIPT_DIR=$(cd -- "$(dirname -- "$0")" && pwd)



if command -v yarn >/dev/null 2>&1; then
  if [ ! -d "$SCRIPT_DIR" ]; then
    echo "ERROR: 'SCRIPT_DIR=$SCRIPT_DIR' doesn't seem to exist!"
    exit 1
  fi
  pushd $SCRIPT_DIR > /dev/null
  ## rebuild NextJS
  echo "*********************  BUILD NEXTJS  ***************************"
  echo "Compiling inside: $(pwd)"
  yarn run build || { echo "ERROR: Issue with building NextJS module!!!"; exit 1; }
  echo "***************************************************************"
  ## yarn pack does not change anything if you don't do a version bump / clear cache!

  #check if yarn is the correct version!
  corepack enable
  yarn set version canary
  yarn run pack
  # TGZ_FILE=$(yarn pack | awk -F'"' '{print $2}' | awk -F'/' '{print $NF}' | grep -Ev "^#|^$")
  # if [ -z "${TGZ_FILE}" ]; then
  #   echo "ERROR: No tgz file generated: '${TGZ_FILE}'"
  #   exit 1
  # elif [ ! -f "${TGZ_FILE}" ] || [ ! -d "${SCRIPT_DIR}/dist" ]; then
  #   echo "ERROR: Couldn't move ./${TGZ_FILE}, either file or destination doesn't exist."
  #   exit 1
  # else
  #   mv ./${TGZ_FILE} $SCRIPT_DIR/dist/.
  #   echo "${TGZ_FILE} moved to $SCRIPT_DIR/dist/."
  # fi
  popd > /dev/null
else
  echo "ERROR: missing yarn!"
  exit 1
fi
