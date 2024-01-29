const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const socketPath = "/run/nginx/node-nextjs.socket";

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
    console.log(` Ready on ${socketPath}`);
  });
});
