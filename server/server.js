const express = require('express');
const SocketServer = require('ws').Server;

const PORT = 8080;
const app = express();

const server = app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}`)
);

const wss = new SocketServer({ server });

wss.on('connection', ws => {
  console.log('Client connected');

  // Set up a callback for when a client closes the socket.
  ws.on('close', () => console.log('Client disconnected'));
});
