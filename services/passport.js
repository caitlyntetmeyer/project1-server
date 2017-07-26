// Import files:
var passport = require('passport');
var User = require('../models_mongo/user');
var config = require('../config.js');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local');

// Create local strategy:
var localOptions = { usernameField: 'email' };
var localLogin = new LocalStrategy(localOptions, function(email, password, done){

	// Find one user and compare pw. To find the existing user with email, we will use ‘email’ from the user model.:
	console.log("made it here");
	User.findOne({email: email}, function(err, user){
		// If there's an error in the search, return early w/error object:
		if(err) { return done(err); }
		// If no error, but user isn't found:
		if(!user) { return done(null, false); }

		// Compare password - is 'password' equal to user.password?
		// Compare pw from req w/user's saved pw:
		user.comparePassword(password, function(err, isMatch){
			// If there was an error, return early:
			if (err) { return done(err); }
			// If pw's not the same, return false & say they didn't match:
			if (!isMatch) { return done(null, false); }

			// If pw's are the same, call passport callback w/user model:
			return done(null, user);
		});
		// tricky part - we salted the pw, & we need to decode the encrypted pw to a normal pw.
	});
	// Otherwise, call 'done' w/'false':
});

// Set up options for the JwtStrategy:
var jwtOptions = {
	// In a request, extract the token from a Header called "authorization":
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	// We need to get a secret key from a config file:
	secretOrKey: config.secret
};

// Create the JwtStrategy.
// The "payload" parameter on the next line is the decoded jwt token.
var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){ 
	// On "payload" on next line, we have a "sub" property - use the User model, look through all users, and find user with given id:
	User.findById(payload.sub, function(err, user){
		// In this findById callback, there are two arguments: "err" and "user". "err" will be populated only if the search fails:
		if (err) { return done(err, false); }
		// If we CAN find the user, pass it to the "done" callback. The user's authenticated:
		if (user) {
			done(null, user);
		} else {
			// If we CAN'T find user with given id, we call "done" func w/o user object:
			done(null, false);
		}
	});
});


// Tell passport to use the jwtLogin function from above:
passport.use(jwtLogin);
passport.use(localLogin);
// Tell passport to use the localLogin function from above:
// passport.use(localLogin);
