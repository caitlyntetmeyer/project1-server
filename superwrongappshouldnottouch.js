require('dotenv').config();
var express = require('express');
var http=require('http');
var app = express();
var bodyParser = require('body-parser');
// var sequelize = require('./db');
// var User = sequelize.import('./models/user');

// mongo setup:
var mongoose = require('mongoose');
var mongodb = require('./db_mongo');
var Account = require('./models_mongo/user')(mongoose);
var Product = require('./models_mongo/product.js')(mongoose);
// mongoose.connect('mongodb://caitlyntetmeyer1:MerryMen182@ds147551.mlab.com:47551/project1');
mongoose.connect(
	'mongodb://localhost:project1/project1');
mongoose.connection.on('connected', function(){
	console.log('connected to db ' + mongodb.databaseUrl)
})
// end mongo setup

// sequelize.sync();
// app.use(express.static('../client'));
// app.use(bodyParser.json());
// app.use(require('./middleware/headers'));
// app.use(require('./middleware/validate-session'));

//HTTP SERVER SETUP

app.use(bodyParser.json({type: '*/*'}))

var server = http.createServer(app);


// Creating a user
app.post('/api/user', function(req, res){
	var username = req.body.user.username;
	var pass = req.body.user.password;
	console.log("IN POST API/USER")
	Account.register(username, pass);
	// Account is a variable from above.
	res.send(200);
	// Once the data has been saved, send an "OK" message.
})

// product route:
app.post('/api/product', function(req, res){
	var name = req.body.product.name;
	var description = req.body.product.description;
	var image = req.body.product.image;
	var price = req.body.product.price;
	console.log(req.body);
	Product.createProduct(name, description, image, price);
	res.send(200);
})

// login route:
app.use('/api/login', require('./routes/session'));
// localhost:3000/api/login

// definition route:POST
app.use('/api/definition', require('./routes/definition'));

app.use('/api/product', require('./routes/product'));

app.use('/api/test', function(req, res) {
	res.send("Hello World");
});

server.listen(3000, function(){
	console.log("App is listening on 3000.");
});
