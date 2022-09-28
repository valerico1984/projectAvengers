const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path= require('path');

require("dotenv").config();

const http = require('http');

// Setting express
const app = express();

app.use(logger('dev'));
app.use(cors())
app.use(express.json());

app.use(cookieParser());


// Setting up the welcome message
require('./server/routes')(app);

app.get('*', (req, res) => res.status(200).send({
	message: 'Bienvenid@s, estás en la aplicación "Project Avengers',
}));

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

if (process.env.NODE_ENV === 'production') {
	// Serve any static files
	app.use(express.static('client/build'));
  // Handle React routing, return all requests to React app
	app.get('*', function(req, res) {
	  res.sendFile(path.resolve(__dirname, 'client','build', 'index.html'))
	});
  }
module.exports = app;