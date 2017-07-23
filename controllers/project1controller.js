var Project1 = require('../models/project1.js');

// This is the add function:
exports.addProject1 = function(req, res, next){
	var title = req.body.props.title;
	var topic = req.body.props.topic;
	var url = req.body.props.url;
	var content = req.body.props.content;
	var specificUser = req.user._id; // Mongo queries are much easier with an underscore before _id.

	var project1 = new Project1({
		title: title,
		topic: topic,
		url: url,
		content: content,
		specificUser: specificUser
	});

	project1.save(function(err){
		if(err) { return next(err); }
		res.json(project1);
	});
}

// This is the fetch function:
exports.fetchProject1s = function(req, res) {
	// Create specificUser variable to store the id of the incoming request:
	var specificUser = req.user._id;

	// The .find function below is a Mongoose function. We are searching for any items that correspond to a specific USER.

	// Put the specificUser variable as the VALUE in the "find" parameter, along w/the specificUser KEY that matches up to the Mongoose model:
	Project1.find({specificUser: specificUser})
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

// Fetch a single item out of MongoDB:
exports.fetchProject1 = function(req, res) {
	var specificProject1 = req.params.id;
	Project1.findOne({_id: specificProject1})
	.then(
		function fetchSuccess(data) {
			res.json(data);
		},
		function fetchError(err) {
			res.send(500, err.message);
		}
	);
}

// Delete a single item out of MongoDB:
exports.deleteProject1 = function(req, res) {
	var specificProject1 = req.params.id;
	Project1.remove({_id: specificProject1})
	.then(
		function deleteSuccess(data) {
			res.json(data);
		},
		function deleteError(err) {
			res.send(500, err.message);
		}
	);
}

exports.updateProject1 = function(req, res) {
	var specificProject1 = req.params.id;
	Project1.findById(specificProject1, function(err, project1Update) {
		if (err) {
			res.status(500, err.message)
		} else {
			project1Update.title = req.body.props.title;
			project1Update.topic = req.body.props.topic;
			project1Update.url = req.body.props.url;
			project1Update.content = req.body.props.content;

			project1Update.save(function(err, project1) {
				if (err) {
					res.status(500, err.message)
				}
				res.send(project1);
			});
		};
	});
}









































