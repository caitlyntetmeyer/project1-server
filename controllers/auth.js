// This file is the controller that handles the authentication when a user is signing UP or signing OUT.

// Import the User model, jwt-simple, & config.js into our controller:
var User = require('../models/user');
var jwt = require('jwt-simple');
var config = require('../config');

// When a user signs UP...
function createUserToken(user){
	// Create a timestamp for when the user created the token:
	var timestamp = new Date().getTime();

	// jwt has a "subject" property (sub). Assign sub to user.id because it's static & won't change. Once a user sign up, she'll have an id that always stays the same:
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
	// iat means "issued at." This adds date-created info to token.
}

// Define a signup function:
exports.signup = function(req, res, next){
	// Grab an incoming request using email & password variables:
	var email = req.body.email;
	var password = req.body.password;
	
	if ( !email || !password ) {
		return res.status(418).send({ error: "You must provide an email and a password."});
	}

	// Find one instance of a specific email address. 1st argument is the email object; 2nd argument is a callback function that runs asynchronously (the function will be invoked when response is received from the server):
	User.findOne({ email: email }, function(err, existingUser){
	// existingUser above: If there's someone with the email, the value will be null.

		// Handle a search error:
		if(err){
			return next(err);
		} 

		// Handle existing users:
		if(existingUser){
			// return res.status(418).send(err);
			return res.status(418).send("Email is in use.");
		}

		// If the user doesn't exist, save the user:
		var user = new User({
			email: email,
			password: password
		});

		// Save the user's record to the database:
		user.save(function(err){
			if (err) { return next(err); }
			// Respond to request with a token:
			res.json({ token: createUserToken(user) });
		});
	});
}

exports.signin = function(req, res, next){
	// User's already had her email & pw authorized.
	// We just need to give her a token.
	res.send({ token: createUserToken(req.user) });
}


// Module 9 Correction from Ben Cook:
// function createUserToken(user){
//     let timestamp = new Date().getTime();
//     return jwt.encode({sub: user.id,iat: timestamp }, config.secret);
// }

























