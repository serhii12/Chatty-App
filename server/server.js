const express = require('express');
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');

const SocketServer = WebSocket.Server;
const colorArray = require('./colors');

const PORT = 8081;
const app = express();

const getColor = () => Math.floor(Math.random() * colorArray.length - 1) + 1;

const server = app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}`)
);

const wss = new SocketServer({ server });

// Broadcast - Goes through each client and sends message data
wss.broadcast = data => {
  wss.clients.forEach(client => {
    // Broadcast to everyone else.
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

const handleMessage = messageData => {
  // Parse the message
  const msg = JSON.parse(messageData);
  // Create unique id for the msg
  msg.id = uuidv4();
  if (msg.type === 'postMessage') {
    msg.type = 'incomingMessage';
  } else {
    msg.type = 'incomingNotification';
  }
  wss.broadcast(msg);
};

wss.on('connection', ws => {
  console.log('Client connected');
  // Increment counter by one when the user connected
  const newConnection = {
    type: 'newUser',
    counter: wss.clients.size,
    randomColor: colorArray[getColor()],
  };
  wss.broadcast(newConnection);

  // Loop over each client and send updated counter with user and each user randomColor
  // wss.clients.forEach(client => {
  //   // Broadcast to everyone else.
  //   if (client.readyState === WebSocket.OPEN) {
  //     client.send(
  //       JSON.stringify({
  //         type: 'newUser',
  //         counter,
  //         randomColor: colorArray[getColor()],
  //       })
  //     );
  //   }
  // });
  ws.on('message', handleMessage);
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
