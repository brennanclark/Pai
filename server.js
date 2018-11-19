"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || 'development';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[ENV]);
const dataHelpers = require('./db/data-helper.js')(knex);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));




//----------------------CONNECTIONS ROUTE----------------------//


app.get('/', (req, res) => {
  res.send("HELLO")
})


app.get('user/:id/connections', (req, res) => {

});

//----------------------REMOVE CONNECTION ROUTE----------------------//
app.post('/connections/:connection_id/delete', (req, res) => {
  dataHelpers.deleteConnectionById(req.params.connection_id)
    .then(() => {
      res.send("HURRAY")
    })
});

//----------------------GO TO TARGET PAGE----------------------//
app.get('user/:id', (req, res) => {

});



app.listen(PORT, () => {
  console.log("PAI is running on port: " + PORT);
});