"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || 'development';
const express     = require('express');
const bodyParser  = require('body-parser');
const app         = express();

const webpack          = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config           = require('./webpack.config');

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

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }
})
.listen(3000, '0.0.0.0', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Running at http://0.0.0.0:3000');
});

app.listen(PORT, () => {
  console.log("PAI is running on port: " + PORT);
});