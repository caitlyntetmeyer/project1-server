var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// module.exports = function(mongoose){
// "module.exports" allows this code be accessible elsewhere
var UserSchema = new mongoose.Schema({
  // "new mongoose.Schema" creates an instance of this table saying how the data should be saved (see the next two lines)
  email: {type: String},
  password: {type: String},
  cart: {type: Array},
  role: {type: String}
});

UserSchema.methods.comparePassword = function(candidatePassword, callback){
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		if(err){ return callback(err) }

		callback(null, isMatch);
	})
}

var User = mongoose.model('User', UserSchema);
  // how we build the model in our database. Calling the table 'User' and passing in UserSchema (from line 5 above)

module.exports = User;
