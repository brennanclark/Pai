const express = require('express');
const SocketServer = require('ws').Server
const uuid = require('uuid-js')

const PORT = 3331;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({server});

wss.on('connection', (ws) => {
  console.log(`${uuid.create().toString()} Connection Opened`)

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)

    console.log(data);
  }

  ws.on('close', () => {
    console.log('Client disconnected');
  })

})

