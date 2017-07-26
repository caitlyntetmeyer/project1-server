var Auth = require('./controllers/auth');
var User = require('./models_mongo/user');
var Project1 = require('./controllers/project1controller');
var passportService = require('./services/passport');
var passport = require('passport');
var Product = require('./models_mongo/product');
var requireAuth = passport.authenticate('jwt', {session: false});
var requireSignin = passport.authenticate('local', {session:false});

module.exports = function(app){	
	app.post('/api/signin', requireSignin, Auth.signin);
	app.post('/api/signup', Auth.signup);
	app.post('/api/shirt', requireAuth, Project1.addProduct);
	app.get('/api/shirts', requireAuth, Project1.fetchProducts);
	app.get('/api/shirts/:id', requireAuth, Project1.fetchProduct);
	app.put('/api/shirt', requireAuth, Project1.updateProduct);
	app.delete('/api/product', requireAuth, Project1.deleteProduct);
}
