var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	title: {
		type: String,
		default: ''
	},
	desc: {
		type: String,
		default: ''
	},
	image: {
		type: String,
		default: ''
	},
	specificUser: {
		type: String,
		default: ''
	}
});

module.exports = mongoose.model('Product', ProductSchema);
// .model accepts 2 arguments: 
// 1) How you want this collection/table to be called. 
// 2) What we have to pass to this model so we can save data to db.
