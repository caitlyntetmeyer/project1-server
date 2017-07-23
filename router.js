// Import stuff:
var Auth = require('./controllers/auth');
var User = require('./models/user');
// var Project1 = require('./controllers/project1controller');

// var passportService = require('./services/passport');
// var passport = require('passport');

// // Add the Passport interceptor/middleware that'll live btwn the incoming request & router:
// var requireAuth = passport.authenticate('jwt', {session: false});
// // By default, the .authenticate above wants to make a cookie. Since we're using jwt, we don't WANT a cookie. That's why we set the 1st parameter to 'jwt' and the 2nd to {session: false}.

// // Create another helper:
// var requireSignin = passport.authenticate('local', {session:false});

module.exports = function(app){	
	app.post('/signup', Auth.signup);
	// });

// 	app.post('api/signin', requireSignin, Auth.signin);
// 	// When a user wants to sign up, route her to '/signup' and run the signup function:
// 	app.post('/api/signup', Auth.signup);
// 	app.post('/api/newitem', requireAuth, Project1.addProject1);
// 	app.get('/api/items', requireAuth, Project1.fetchProject1s);
// 	app.get('/api/items/:id', requireAuth, Project1.fetchProject1);
// 	// Do I need this line? -
// 	app.put('/api/items/:id', requireAuth, Project1.updateProject1);
// 	app.delete('/api/items/:id', requireAuth, Project1.deleteProject1);

}





































