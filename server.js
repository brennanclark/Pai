"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 3000;
const ENV         = process.env.ENV || 'development';
const express     = require('express');
const bodyParser  = require('body-parser');
const app         = express();

const knexConfig  = require('./knexfile');
const knex        = require('knex')(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');


app.use(morgan('dev'));

app.use(knexLogger(knex));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));




//----------------------CONNECTIONS ROUTE----------------------//

app.get('user/:id/connections', (req, res) => {

});

//----------------------REMOVE CONNECTION ROUTE----------------------//
app.post('user/:id/connections/:connection_id', (req, res) => {

});


//----------------------GO TO TARGET PAGE----------------------//
app.get('user/:id', (req, res) => {

});

app.listen(PORT, () => {
  console.log("PAI is running on port: " + PORT);
});