const express = require('express');
const SocketServer = require('ws').Server
const uuid = require('uuid-js');
const axios = require('axios');
const {ipv4} = require ('./config.json');
const haversine = require('haversine');


const PORT = 3001;

const server = express()
  .use(express.static('public'));

const wss = new SocketServer({port: PORT});



function test(connectedUser){
  return axios.get(`${ipv4}/user/${connectedUser.id}/location/`)
}

wss.on('connection', (ws) => {
  console.log(`${uuid.create().toString()} Connection Opened`);

  ws.onmessage = (event) => {

    const dataFromUser = JSON.parse(event.data);
    const user = Number(dataFromUser.currentUserId);
    const latitude = dataFromUser.lat;
    const longitude = dataFromUser.long;

    const sourceUser = {
      latitude: latitude,
      longitude: longitude
    }

    axios({
      method: 'post',
      url: `${ipv4}/user/${user}/location/`,
      data: {
        user: user,
        longitude: longitude,
        latitude: latitude
      }
    }).then((response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err.message);
    })

    axios.get(`${ipv4}/user/${user}/connections`)
    .then((res) => {
      var allCalls = [];
      var mergedData = [] 
      res.data.forEach((connectedUser) => {
        allCalls.push(axios.get(`${ipv4}/user/${connectedUser.id}/location/`));
      })

      Promise.all([...allCalls]).then(function(values) {

        values.forEach(function(t){

            let otherUser = {
            latitude: Number(t.data[0].lat),
            longitude: Number(t.data[0].long),
          }

          var dataToUser = {
            [t.data[0].user_id]: {
            userId: t.data[0].user_id,
            distance: haversine(sourceUser, otherUser, {unit:'meter'})
            }
          }
          mergedData.push(dataToUser);
        })
        ws.send(JSON.stringify(mergedData));
      });
    });
  }

  ws.on('close', () => {
    console.log('Client disconnected');
  })

})

// server.listen(PORT, '0.0.0.0', 'localhost',  () => console.log(`Listening on ${ PORT }`));
