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
  dataHelpers.getConnectUsersWithNuggets(Number(req.params.id))
  .then((data)=> {
    res.json(data);
  })
});


//----------------------REMOVE CONNECTION ROUTE----------------------//
app.post('/connections/:connection_id/delete', (req, res) => {
  dataHelpers.deleteConnectionById(req.params.connection_id)
    .then((data) => {
      console.log('THIS IS FROM THE SERVER.JS', data)
    })
});

//----------------------GO TO TARGET PAGE----------------------//


//-------------------UPDATE USER LOCATION DATABAE ------------//
app.post('/user/:id/location/', (req,res) => {
  const longitude = Number(req.body.longitude);
  const latitude = Number(req.body.latitude);
  const userId = Number(req.body.user)
  
  dataHelpers.sendLocationToDatabase(userId, latitude, longitude, '2018-11-17 10:23:58+00')
  .then((data) => {
    console.log(data);
  })  
})


app.listen(PORT, '0.0.0.0', () => {
  console.log("PAI is running on port: " + PORT);
});