require('dotenv').config();
var cors = require('cors');
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var router = require('./router');
var mongoose = require('mongoose');

// Database connection:
mongoose.connect('mongodb://caitlyntetmeyer1:MerryMen182@ds147551.mlab.com:47551/project1');

/* Begin Middleware: */

// Add cors (a middleware on the Express side) and use the parens to invoke it. This allows users to make requests from other ports & domains.
app.use(cors());

// Add an instance of bodyParser that will be used to parse incoming JSON requests:
app.use(bodyParser.json({ type: '*/*' }));

// Call the router function and pass in the app:
router(app);

/* End Middleware */


// Define a port on your local machine:
var port = process.env.PORT || 3000;

// Create a node server. Pass your express() app into the createServer() express application by passing in the app variable from above:
var server = http.createServer(app);
// The http library is a native node library and is used for low level http requests.

// Get your server to listen to any requests from the outside world:
server.listen(port);

console.log('Server listening on ' + port);
