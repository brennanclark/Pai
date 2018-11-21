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




wss.on('connection', (ws) => {
  console.log(`${uuid.create().toString()} Connection Opened`);

  ws.onmessage = (event) => {

    const dataFromUser = JSON.parse(event.data);
    const user = Number(dataFromUser.currentUserId);
    const latitude = dataFromUser.lat;
    const longitude = dataFromUser.long;

    const sourceUser = {
      lat: latitude,
      long: longitude
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
      res.data.forEach((connectedUser) => {
        axios.get(`${ipv4}/user/${connectedUser.id}/location/`)
        .then((res) => {
          let otherUser = {
            lat: Number(res.data[0].lat),
            long: Number(res.data[0].long),
          }
          console.log("sourceUser LAT", sourceUser.lat, typeof sourceUser.lat)
          console.log("sourceUser Loooooooong", sourceUser.long, typeof sourceUser.long)
          console.log("otherUser LAT", otherUser.lat, typeof otherUser.lat)
          console.log("otherUser Loooooooong", otherUser.long, typeof otherUser.long)


          console.log("THIS IS THE DISTANCE", haversine(sourceUser, otherUser))
        })
      })
    })

    

  }

  ws.on('close', () => {
    console.log('Client disconnected');
  })


})

// server.listen(PORT, '0.0.0.0', 'localhost',  () => console.log(`Listening on ${ PORT }`));  
