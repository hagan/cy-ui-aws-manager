#!/usr/bin/env bash
AWSMGR_DIR=$(npm list -g awsmgr --parseable)

if [ "x${AWSMGR_DIR}" == "x" ]; then
  echo "ERROR: npm package \"awsmgr may be missing..\""
  echo " $ npm list to check if installed."
  exit 1
elif [ ! -d "${AWSMGR_DIR}" ]; then
  echo "ERROR: the directory ${AWSMGR_DIR} does not exist"
  exit 1
fi

cd ${AWSMGR_DIR} && npm run start-server