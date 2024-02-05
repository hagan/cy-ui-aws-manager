const express = require("express");
const next = require("next");
const fs = require("fs");
const path = require("path");
// const { exec } = require('child_process');

// $HOME/.env.local <= where we can put our environment vars
const localEnvPath = path.join(process.env.HOME, ".env.local");
var socketPath = "/tmp/express.sock";

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
  const server = express();

  // You can add your own express routes here
  server.get("/api/hello", (req, res) => {
    res.send("Hello from Express API");
  });

  // Handling Next.js page requests
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(socketPath, (err) => {
    if (err) throw err;
    // srv_cmd = "getent group www-data | cut -d: -f3"
    // exec(srv_cmd, (error, stdout, stderr) => {
    //   if (error) {
    //     console.error(`exec error while running ${srv_cmd}: ${error}`);
    //     return;
    //   }
    //   const wwwDataGID = parseInt(stdout.trim(), 10);
    //   fs.chown(socketPath, process.getuid(), wwwDataGID, (err) => {
    //     if (err) {
    //       console.error(`chown error: ${err}`);
    //       return;
    //     }
    //   });
    fs.chmod(socketPath, 0o664, (err) => {
      if (err) throw err;
      console.log(`Set permissions for socket ${socketPath} to 0664`);
    });
    // });
    console.log(` Ready on ${socketPath}`);
  });
});
