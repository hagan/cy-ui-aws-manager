const http = require("http");
const express = require("express");
const { createTerminus } = require("@godaddy/terminus");
const next = require("next");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const module = require("@deep/module");

// $HOME/.env.local <= where we can put our environment vars
const localEnvPath = path.join(process.env.HOME, ".env.local");

fs.access(localEnvPath, fs.constants.F_OK, (err) => {
  if (err) {
    console.error("$HOME/.env.local not found.");
  } else {
    require("dotenv").config({ path: localEnvPath });
    if (process.env.NODE_SOCK) {
      socketPath = process.env.NODE_SOCK;
    }
    // Your server setup code goes here
  }
});

// Maybe need to add tests to check for Environment variables required for project?

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

var socketPath = "/tmp/express.sock";
if (process.env.NODE_SOCK) {
  socketPath = process.env.NODE_SOCK;
}

app.prepare().then(() => {
  /**
   *   NextJS startup application
   */
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

  // A simple Port based webserver
  // server.listen(3000);

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
