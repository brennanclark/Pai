const express = require('express');
const SocketServer = require('ws').Server
const uuid = require('uuid-js');
const axios = require('react-native-axios');
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

    function sendLocationToDatabase() {
      axios.post(`${ipv4}/user/${user}/location/`)
      .then((response)=>{
        console.log(response);
      })
    }

    sendLocationToDatabase()

    // if(user1) {
    //   var user1 = {
    //     latitude: latitude,
    //     longitude: longitude,
    //   }
    // }
    
    // user.matches.forEach(matchUser => {
    //   axios.get(user/2/locations)
    //   .then(){
    //     var user1 = {
    //       latitude: latitude,
    //       longitude: longitude,
    //     }
    //   }
    //   }
  
    // }) 

    // if(user1 && user2) {
    //   console.log("USER1", user1)
    //   console.log("USER2", user2)
    //   var distance = haversine(user1,user2,{type:'meter'})
    // }

    // var sendDataToUser = {
    //   id: user,
    //   distance: distance,
    // }


    console.log("USER", user)
    console.log("latitude", latitude)
    console.log("longitutde", longitude)

    // save to db

    // broadcast
    // wss.clients.forEach(function each(client) {
    //   console.log("ws-server", JSON.stringify(sendDataToUser));
    //   client.send(JSON.stringify(sendDataToUser))
    // })

    
    // if(user2 exists in the connections){
    //   calculate the difference distances
    //   and send the distances to ONLY the users in this specific connections
    // }

    // SUDO CODE:
    // axios.get(`${ipv4}/${user}/connections`)
    // if(the data has an ID, {
    //   get the difference of the locations between two latitude and longitudes

    //   send the difference of the location to ONLY these people
    // })

  }

  ws.on('close', () => {
    console.log('Client disconnected');
  })


})

// server.listen(PORT, '0.0.0.0', 'localhost',  () => console.log(`Listening on ${ PORT }`));  
