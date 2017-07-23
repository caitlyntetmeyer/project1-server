// // Import mongoose:
// var mongoose = require('mongoose');
// //Import bcrypt for NodeJS:
// var bcrypt = require('bcrypt-nodejs');

// // Create a Schema variable. A Schema will tell mongoose about particular fields our models will have:
// var Schema = mongoose.Schema;

// // Create a new Schema object called userSchema that will help us tell Mongoose that we're passing an email and a password for our new users:
// var userSchema = new Schema({
// 	email: {
// 		type: String,
// 		// Make sure that after a user creates an account, she can't create a new account:
// 		unique: true,
// 		// Since Mongo doesn't know the difference btwn an uppercase string & a lowercase string, make everything lowercase:
// 		lowercase: true
// 	},
// 	password: String
// });

// // Encrypt passwords:
// // Before a user's saved, run a function:
// userSchema.pre('save', function(next){
// 	// Get access to the user model:
// 	var user = this;

// 		// Call the generate salt method on the bcrypt variable.
// 		// 10 is the salt cost.
// 		// After generating salt, call a callback function.
// 		bcrypt.genSalt(10, function(err, salt){
// 			if(err) { return next(err); }

// 			// Encrypt/hash the pw w/a salt.
// 			// After encrypting the pw, call another callback.
// 			// The hash will be the result of the callback.
// 			bcrypt.hash(user.password, salt, null, function(err, hash){
// 				if(err) { return next(err); }

// 				// Overwrite the plain-text pw w/hashed pw:
// 				user.password = hash;

// 				// After it's done, save the model:
// 				next();
// 			});
// 		});
// });

// userSchema.methods.comparePassword = function(candidatePassword, callback){
// 	// this.password is our hashed and salted password:
// 	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
// 		// If there was an error, return the callback with the error:
// 		if (err) { return callback(err); }
// 		// Otherwise, call the callback:
// 		callback(null, isMatch);
// 	});
// }

// // Create the model that will create new users and load the Schema into Mongoose. This tells Mongoose that there's a new Schema called 'userSchema' that corresponds to a collection called 'user' (1st parameter):
// var model = mongoose.model('user', userSchema);

// // Export this module:
// module.exports = model;





// Old Stuff:

// // https://docs.google.com/document/d/1nyQIPAO6sOgAkBXQcY8RvpssTPVTZvxSCHvbOgFgGkQ/edit

// // Import mongoose:
var mongoose = require('mongoose');
// Import bcrypt for NodeJS:
var bcrypt = require('bcrypt-nodejs');

// Create a Schema variable. A Schema will tell mongoose about particular fields our models will have:
var Schema = mongoose.Schema;

// Create a new Schema object called userSchema that will help us tell Mongoose that we're passing an email and a password for our new users:
var userSchema = new Schema({
	email: {
		type: String,
		// Make sure that after a user creates an account, she can't create a new account:
		unique: true,
		// Since Mongo doesn't know the difference btwn an uppercase string & a lowercase string, make everything lowercase:
		lowercase: true
	},
	password: String
});

// Encrypt passwords:
// Before a user's saved, run a function:
userSchema.pre('save', function(next){
	// Get access to the user model:
	var user = this;

		// Call the generate salt method on the bcrypt variable.
		// 10 is the salt cost.
		// After generating salt, call a callback function.
		bcrypt.genSalt(10, function(err, salt){
			if(err) { return next(err); }

			// Encrypt/hash the pw w/a salt.
			// After encrypting the pw, call another callback.
			// The hash will be the result of the callback.
			bcrypt.hash(user.password, salt, null, function(err, hash){
				if(err) { return next(err); }

				// Overwrite the plain-text pw w/hashed pw:
				user.password = hash;
				
				// After it's done, save the model:
				next();
			});
		});
});

userSchema.methods.comparePassword = function(candidatePassword, callback){
	// this.password is our hashed and salted password:
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		// If there was an error, return the callback with the error:
		if (err) { return callback(err); }
		// Otherwise, call the callback:
		callback(null, isMatch);
	});
}

// Create the model that will create new users and load the Schema into Mongoose. This tells Mongoose that there's a new Schema called 'userSchema' that corresponds to a collection called 'user' (1st parameter):
var model = mongoose.model('user', userSchema);

// Export this module:
module.exports = model;
