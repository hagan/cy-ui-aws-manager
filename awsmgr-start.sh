#!/usr/bin/env bash

if [ $(whoami) != 'node' ]; then
  >&2 echo "ERROR: must run awsmgr-start as 'node' user. Currently running as: $(whoami)"
  exit 1
else
  echo "Express service running as '$(whoami)'"
fi

if [[ "$(/usr/bin/yarn global dir)x" == "x" ]]; then
  >&2 echo "ERROR: command 'yarn global dir' has returned nothing"
  exit 1
else
  export YARN_DIR="$(/usr/bin/yarn global dir)" \
    || { >&2 echo "Error getting yarn global dir!"; exit 1; }
fi

export AWSMGR_DIR="${YARN_DIR}/node_modules/awsmgr"
if [ "${AWSMGR_DIR}/node_modules/awsmgr" == "/node_modules/awsmgr" ]; then
  >&2 echo "ERROR: YARN_DIR was empty.."
  exit 1
fi

if [ ! -d "${AWSMGR_DIR}" ]; then
  >&2 echo "ERROR: ${AWSMGR_DIR} is not a directory!"
  exit 1
fi

(. /home/node/.env.local && cd ${AWSMGR_DIR} && /usr/bin/node server/index.js)