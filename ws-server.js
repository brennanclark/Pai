const express = require('express');
const SocketServer = require('ws').Server
const uuid = require('uuid-js');

const PORT = 3001;

const server = express()
  .use(express.static('public'));

const wss = new SocketServer({port: PORT});

wss.on('connection', (ws) => {
  console.log(`${uuid.create().toString()} Connection Opened`);

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    console.log("THIS IS IN THE WEB_SOCKET SEVER", data);
  }

  ws.on('close', () => {
    console.log('Client disconnected');
  })


})

// server.listen(PORT, '0.0.0.0', 'localhost',  () => console.log(`Listening on ${ PORT }`));  
