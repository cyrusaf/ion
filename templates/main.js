/* ROUTER.JS
 *
 * === Description ===
 * The main application for the API. It's running nodejs: 
 * the router is expressjs, mongoose is the ORM.
 *
 * === Instructions ===
 * Use the command `node main.js` to start the server.
 */

// Router config
// ==========
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var cors       = require('cors');

// For parsing post data
app.use(bodyParser());

// For allowing cross-domain access
app.use(cors());

// Global API requires (MVC + Services)
// ==========
GLOBAL.Controllers = require('./controllers/init');
GLOBAL.Models      = require('./models/init');

// Routes
// ==========

// Example router
var exampleRouter = express.Router();
app.use('/examples', exampleRouter);
	
	// Create a university
	exampleRouter.post('/', function(req, res) {
		//Controllers.Example.create(req, res);
	});

	// Read universities
	exampleRouter.get('/', function(req, res) {
		//Controllers.Example.read(req, res);
	});

// Server
// ==========
var server = app.listen(3001, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('API listening at https://' + host + ':' + port);
});