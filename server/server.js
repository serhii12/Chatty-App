const express = require('express');
const WebSocket = require('ws');

const SocketServer = WebSocket.Server;
const uuidv4 = require('uuid/v4');

const PORT = 8081;
const app = express();

const server = app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}`)
);

const wss = new SocketServer({ server });

wss.on('connection', ws => {
  console.log('Client connected');
  ws.on('message', data => {
    const msg = JSON.parse(data);
    msg.id = uuidv4();
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        console.log(JSON.stringify(msg));
        client.send(JSON.stringify(msg));
      }
    });
  });
  ws.on('close', () => console.log('Client disconnected'));
});
