#!/usr/bin/env bash

if [ $(whoami) != 'node' ]; then
  echo "ERROR: must run awsmgr-start as 'node' user. Currently running as: $(whoami)"
  exit 1
fi

cd $HOME
export PATH=$HOME/node_modules/.bin:$PATH
AWSMGR_DIR=$(npm list awsmgr --parseable)

if [ "x${AWSMGR_DIR}" == "x" ]; then
  echo "ERROR: npm package \"awsmgr may be missing..\""
  echo " $ npm list to check if installed."
  exit 1
elif [ ! -d "${AWSMGR_DIR}" ]; then
  echo "ERROR: the directory ${AWSMGR_DIR} does not exist"
  exit 1
else
  echo "cd ${AWSMGR_DIR} and start ExpressJS server..."
  cd ${AWSMGR_DIR} && /usr/bin/npm run start-server
fi
