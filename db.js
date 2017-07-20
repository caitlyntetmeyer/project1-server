var Sequelize = require('sequelize');	

var sequelize = new Sequelize('workoutlog', 'postgres', 'Letmein1234!', {
	host: 'localhost',
	dialect: 'postgres'
});

sequelize.authenticate().then(	// "Once you're authenticated, THEN..."
	function() {
		console.log('Connected to project1 postgres db');	//"...log this sentence."
	},	// This comma indicates that there are 2 arguments in this function.
	function(err) {	// "If authentication fails..."
		console.log(err);	// "...log an error."
	}
);

var User = sequelize.import('./models/user');

module.exports = sequelize;
