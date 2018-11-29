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
  const matches = msg.content.match(
    /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/
  );
  if (matches) {
    // Image stuff
  } else if (msg.type === 'postMessage') {
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
    type: 'onlineUsers',
    counter: wss.clients.size,
  };
  // broadcast online user to everyone
  wss.broadcast(newConnection);

  // assign a color to a user on a connection
  const newColor = {
    type: 'newUserColor',
    randomColor: colorArray[getColor()],
  };
  ws.send(JSON.stringify(newColor));

  ws.on('message', handleMessage);
  ws.on('close', () => {
    wss.broadcast(newConnection);
    console.log('Client disconnected');
  });
});
