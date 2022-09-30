const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path= require('path');
const bodyParser = require('body-parser');

require("dotenv").config();


// Setting express
const app = express();

app.use(cors())
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./routes')(app)

app.get('/', (req, res) => res.status(200).send({
	message: 'Bienvenid@, estás en la aplicación "Project Avengers',
}));

if (process.env.NODE_ENV === 'production') {
	// Serve any static files
	app.use(express.static(path.join(__dirname, '/client/build')));
  // Handle React routing, return all requests to React app
	app.get('*', function(req, res) {
	  res.sendFile(path.resolve(__dirname, 'client','build', 'index.html'))
	});
  }

app.listen(3800, function () {
	console.log("Node server running on http://localhost:3800");
  });

module.exports = app;