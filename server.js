"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || 'development';
const express     = require('express');
const bodyParser  = require('body-parser');
const app         = express();

const knexConfig  = require('./knexfile');
const knex        = require('knex')(knexConfig[ENV]);
const dataHelpers = require('./db/data-helper.js')(knex);
const axios       = require('axios');
const {ipv4}      = require('./config.json')

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static("public"));

//----------------------CONNECTIONS ROUTE----------------------//


//----------------------GET USER PROFILE With NUGGETS----------------------//
app.get('/user/:id', (req,res) => {
  dataHelpers.getMyProfileWithNuggets(Number(req.params.id))
  .then((data) => {
    res.json(data);
  })
});


//----------------------GET CONNECTION ROUTE----------------------//
app.get('/user/:id/connections', (req, res) => {
  dataHelpers.getConnectUsersWithNuggets(Number(req.params.id), (data)=> {
    res.json(data);
  })
});

//----------------------CREATE NEW CONNECTION --------------------//

app.post('/user/:id/connections/new', (req,res) => {
  dataHelpers.createNewConnection(Number((req.params.id)))
    .then((data) => {
      dataHelpers.getConnectUsersWithNuggets(Number(req.params.id), (data)=> {
        res.json(data);
      })
    })
})


//----------------------REMOVE CONNECTION ROUTE----------------------//
app.post('/connections/:connection_id/delete', (req, res) => {
  dataHelpers.deleteConnectionById(Number((req.body.currentConnectionId)))
    .then((data) => {
      dataHelpers.getConnectUsersWithNuggets(Number(req.body.userId), (data)=> {
        res.json(data);
      })
    })
});

//----------------------ADD A FRIEND----------------------//

app.post('/connections/:connection_id/friends', (req, res) => {
  dataHelpers.setFriendsAt(req.params.connection_id)
    .then((data) => {
      dataHelpers.getConnectUsersWithNuggets(Number(req.body.userId), (data)=> {
        res.json(data);
      })
    })
});

//-------------------UPDATE USER LOCATION DATABASE ------------//
app.post('/user/:id/location/', (req,res) => {
  const longitude = Number(req.body.longitude);
  const latitude = Number(req.body.latitude);
  const userId = Number(req.body.user)

  dataHelpers.sendLocationToDatabase(userId, latitude, longitude)
  .then((data) => {
    console.log("Location was added");
  })
})


//------------------GET USER's LOCATION ---------------------//
app.get('/user/:id/location/', (req,res) => {
  dataHelpers.findLocationByUserId(Number(req.params.id))
  .then((data)=> {
    res.json(data);
  })
})


app.listen(PORT, '0.0.0.0', () => {
  console.log("PAI is running on port: " + PORT);
});