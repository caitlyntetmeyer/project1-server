var Product = require('../models_mongo/product.js');

// This is the add function:
exports.addProduct = function(req, res, next){
	var title = req.body.shirt.title;
	var desc = req.body.shirt.desc;
	var image = req.body.shirt.image;
	var specificUser = req.user._id; // Mongo queries are much easier with an underscore before _id.

	var product = new Product({
		title: title,
		desc: desc,
		image: image,
		specificUser: specificUser
	});

	product.save(function(err){
		if(err) { return next(err); }
		res.json(product);
	});
}

// This is the fetch function:
exports.fetchProducts = function(req, res) {
	// Create specificUser variable to store the id of the incoming request:
	var specificUser = req.user._id;
	console.log(specificUser);
	// The .find function below is a Mongoose function. We are searching for any shirts that correspond to a specific USER.

	// Put the specificUser variable as the VALUE in the "find" parameter, along w/the specificUser KEY that matches up to the Mongoose model:
	Product.find({specificUser: specificUser})
	.then(
		// The fetchSuccess method below returns a response for the specific USER.
		function fetchSuccess(data) {
			// In the response is the user's DATA that gets sent back in the form of JSON:
			res.json(data);
		},
		// Error handling:
		function fetchError(err) {
			res.send(500, err.message);
		}
	);
}

// Fetch a single product out of MongoDB:
exports.fetchProduct = function(req, res) {
	var specificProduct = req.params.id;
	Product.findOne({_id: specificProduct})
	.then(
		function fetchSuccess(data) {
			res.json(data);
		},
		function fetchError(err) {
			res.send(500, err.message);
		}
	);
}

// Delete a single product out of MongoDB:
exports.deleteProduct = function(req, res) {
	console.log(Object.keys(req.body));
	var specificProduct = req.body.product._id;
	Product.remove({_id: specificProduct})
	.then(
		function deleteSuccess(data) {
			res.json(data);
		},
		function deleteError(err) {
			res.send(500, err.message);
		}
	);
}

exports.updateProduct = function(req, res) {
	console.log(Object.keys(req.body.shirt));
	var specificProduct = req.body.shirt._id;
	console.log(specificProduct)
	Product.findById(specificProduct, function(err, productUpdate) {
		if (err) {
			res.status(500, err.message)
		} else {
			productUpdate.title = req.body.shirt.title;
			productUpdate.desc = req.body.shirt.desc;
			productUpdate.image = req.body.shirt.image;
			productUpdate.save(function(err, product) {
				if (err) {
					res.status(500, err.message)
				}
				res.send(product);
			});
		};
	});
}
