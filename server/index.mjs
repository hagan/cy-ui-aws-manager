// Express/NextJS web server v0.0.5

// const http = require("http");
import http from "http";
// const express = require("express");
import express from "express";
// const { createTerminus } = require("@godaddy/terminus");
import { createTerminus } from "@godaddy/terminus";
// const next = require("next");
import next from "next";
// const fs = require("fs");
import fs from "fs";
// const path = require("path");
import path from "path";
// const { exec } = require("child_process");
// import exec from 'child_process';

// $HOME/.env.local <= where we can put our environment vars
// const localEnvPath = path.join(process.env.HOME, ".env.local");
// require("dotenv").config({ path: localEnvPath });
const localEnvPath = path.join(process.env.HOME, ".env.local");
import("dotenv").then((dotenv) => dotenv.config({ path: localEnvPath }));

function main() {
  // Initial state
  var isDev = undefined;
  var socketPath = undefined;

  // console.log(`EXPRESS_SOCKET_FILE: ${process.env.EXPRESS_SOCKET_FILE}`);
  if (process.env.EXPRESS_SOCKET_FILE) {
    socketPath = process.env.EXPRESS_SOCKET_FILE;
  } else {
    socketPath = "/tmp/express.sock";
  }

  // console.log(`DEPLOY_TYPE: ${process.env.DEPLOY_TYPE}`);
  // Default to dev server
  if (
    process.env.DEPLOY_TYPE !== undefined &&
    (process.env.DEPLOY_TYPE === "production" ||
      process.env.DEPLOY_TYPE === "prod")
  ) {
    // console.log(`DEPLOY_TYPE is production !?: ${process.env.DEPLOY_TYPE}`);
    isDev = false;
  } else {
    // console.log(`DEPLOY_TYPE is not production !?: ${process.env.DEPLOY_TYPE}`);
    isDev = true;
    socketPath = 3000;
  }

  if (socketPath !== 3000) {
    // Not using a port, socket -- Check we can write to folder/directory
    try {
      fs.accessSync(
        path.dirname(socketPath),
        fs.constants.F_OK | fs.constants.W_OK,
      );
    } catch (err) {
      if (err.code === "ENOENT") {
        console.error(
          `ERROR: The directory '${path.dirname(socketPath)}' does not exist!`,
        );
        process.exit(1);
      } else {
        console.error(
          `ERROR: The directory '${path.dirname(socketPath)}' is not writable!`,
        );
        process.exit(1);
      }
    }
  }

  /**
   *   NextJS startup application
   */
  const app = next({ isDev, dir: ".", quiet: false });
  const handle = app.getRequestHandler();
  app.prepare().then(() => {
    console.log(`ExpressJS starting up (dev: ${isDev}) on ${socketPath}`);

    const express_app = express();

    /* Test Expres app (returns ok) */
    // express_app.get('/', (req, res) => {
    //   res.send('ok');
    // });
    /* Main NextJS entry point into expressJS */
    express_app.all("*", (req, res) => {
      return handle(req, res);
    });

    /* Not sure why we need the basic http server, but Terinus wanted this */
    const server = http.createServer(express_app);

    function onSignal() {
      console.log("Server is starting cleanup");
      // cleanup of resourecs like databases or file descriptors
      // Remove our socket
      console.log(`Removing socket file: '${socketPath}`);
      if (fs.existsSync(socketPath)) {
        fs.unlinkSync(socketPath);
        console.log(`Removed socket '${socketPath}'!`);
      } else {
        console.log(`... already removed`);
      }
    }

    async function onHealthCheck() {
      // check if the system is healthy, db connections etc...
    }

    createTerminus(server, {
      signal: "SIGINT",
      healthChecks: { "/healthcheck": onHealthCheck },
      onSignal,
    });

    // NOTE: Setup file permissions with acl & setgid and control file permissions
    /**
     * I.E.
     * mkdir -p /run/node/sockets
     * chown node:node /run/node
     * chown node:www-data /run/node/sockets \
     * chmod g+sw,o-rx /run/node/sockets \
     * setfacl -d -m g:www-data:rwx /run/node/sockets \
     * setfacl -d -m o::--- /run/node/sockets
     *
     * Now Socket files made in /run/node/sockets can be r/w by Nginx/Apache
     * without r/w on node user owned files.
     */

    server.listen(socketPath, (err) => {
      if (err) throw err;
      console.log(` Ready on ${socketPath}`);
    });
  });
}

export { main };
