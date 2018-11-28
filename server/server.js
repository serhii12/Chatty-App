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
let counter = 0;
const colorArray = [
  '#FF6633',
  '#FFB399',
  '#FF33FF',
  '#FFFF99',
  '#00B3E6',
  '#E6B333',
  '#3366E6',
  '#999966',
  '#99FF99',
  '#B34D4D',
  '#80B300',
  '#809900',
  '#E6B3B3',
  '#6680B3',
  '#66991A',
  '#FF99E6',
  '#CCFF1A',
  '#FF1A66',
  '#E6331A',
  '#33FFCC',
  '#66994D',
  '#B366CC',
  '#4D8000',
  '#B33300',
  '#CC80CC',
  '#66664D',
  '#991AFF',
  '#E666FF',
  '#4DB3FF',
  '#1AB399',
  '#E666B3',
  '#33991A',
  '#CC9999',
  '#B3B31A',
  '#00E680',
  '#4D8066',
  '#809980',
  '#E6FF80',
  '#1AFF33',
  '#999933',
  '#FF3380',
  '#CCCC00',
  '#66E64D',
  '#4D80CC',
  '#9900B3',
  '#E64D66',
  '#4DB380',
  '#FF4D4D',
  '#99E6E6',
  '#6666FF',
];

const getColor = () => Math.floor(Math.random() * colorArray.length - 1) + 1;

wss.on('connection', ws => {
  console.log('Client connected');
  // Increment counter by one when the user connected
  counter += 1;

  // Loop over each client and send updated counter with user and each user randomColor
  wss.clients.forEach(client => {
    // Broadcast to everyone else.
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: 'newUser',
          counter,
          randomColor: colorArray[getColor()],
        })
      );
    }
  });

  ws.on('message', data => {
    // Parse the message
    const msg = JSON.parse(data);
    switch (msg.type) {
      // handle postMessage
      case 'postMessage': {
        // Create unique id for the msg
        msg.id = uuidv4();
        // Set set a type for each msg
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
  ws.on('close', () => {
    counter -= 1;
    console.log('Client disconnected');
  });
});
