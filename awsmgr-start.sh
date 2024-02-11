#!/usr/bin/env bash

if [ $(whoami) != 'node' ]; then
  echo "ERROR: must run awsmgr-start as 'node' user. Currently running as: $(whoami)"
  exit 1
fi

pushd $HOME
export PATH=$HOME/node_modules/.bin:$PATH
AWSMGR_DIR_LOCAL=$(npm list awsmgr --parseable) 2>/dev/null
AWSMGR_DIR_GLOBAL=$(npm -g list awsmgr --parseable) 2>/dev/null

if [ "x${AWSMGR_DIR_LOCAL}" == "x" ] && [ "x${AWSMGR_DIR_GLOBAL}" == "x" ]; then
  echo "ERROR: npm package \"awsmgr may be missing..\""
  echo " $ npm list or npm -g lsit to check if installed."
  exit 1
elif [ ! -d "${AWSMGR_DIR_LOCAL}" ] && [ ! -d "${AWSMGR_DIR_GLOBAL}" ]; then
  echo "ERROR: the node_modules directory for npm does not exist"
  exit 1
elif [ "x${AWSMGR_DIR_LOCAL}" != "x" ]; then
  echo "cd ${AWSMGR_DIR_LOCAL} and start ExpressJS server..."
  cd ${AWSMGR_DIR_LOCAL} && /usr/bin/npm run start-server
elif [ "x${AWSMGR_DIR_GLOBAL}" == "x" ]; then
  echo "cd ${AWSMGR_DIR_GLOBAL} and start ExpressJS server..."
  cd ${AWSMGR_DIR_GLOBAL} && /usr/bin/npm -g run start-server
fi
popd