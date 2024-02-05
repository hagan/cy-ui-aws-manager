#!/usr/bin/env sh

SCRIPT_DIR=$(cd -- "$(dirname -- "$0")" && pwd)

## Assumes we've installed the awsmgr package
if [ $(whoami) != 'node' ]; then
  echo "ERROR: must run awsmgr-start as 'node' user. Currently running as: $(whoami)"
  exit 1
fi

NODE_ROOT=$(cd $HOME && npm root)
export PATH=$HOME/node_modules/.bin:$PATH
# AWSMGR_DIR=$(npm list awsmgr --parseable)

# if [ -z "${AWSMGR_DIR}" ]; then
#   echo "Missing awsmgr package, install offical pacakge?"
#   exit 1
# fi

# if [ ! -d "${AWSMGR_DIR}" ]; then
#   echo "ERROR: missing folder: '${AWSMGR_DIR}'"
#   exit 1
# fi

# if command -v npm >/dev/null 2>&1; then
#   echo "SCRIPT_DIR: $SCRIPT_DIR"
#   cd ${AWSMGR_DIR}
#   npm ci
#   SKIP_PREPARE=1 yarn install --frozen-lockfile
fi