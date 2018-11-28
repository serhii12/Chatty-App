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
    switch (msg.type) {
      // handle postMessage
      case 'postMessage': {
        msg.id = uuidv4();
        msg.type = 'incomingMessage';
        wss.clients.forEach(client => {
          // Broadcast to everyone else.
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(msg));
          }
        });
        break;
      }
      // handle post notification
      case 'postNotification':
        msg.type = 'incomingNotification';
        msg.id = uuidv4();
        wss.clients.forEach(client => {
          // Broadcast to everyone else.
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(msg));
          }
        });
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error(`Unknown event type ${msg.type}`);
    }
  });
  ws.on('close', () => console.log('Client disconnected'));
});
