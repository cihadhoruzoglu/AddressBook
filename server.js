// Setup
var express 	= require('express'),						// get express module
	app 		= express(),								// create our app w/ express
	mongoose	= require('mongoose'),						// mongoose for mongodb
	port 		= process.env.PORT || 8090,					// set the port
	database	= 'mongodb://localhost/addressbookdb';		// load the database

// Configuration
mongoose.connect(database);

app.configure(function() {
	app.use(express.static(__dirname + '/app')); 		    // set the static files location
	app.use(express.logger('dev')); 						// log every request to the console
	app.use(express.bodyParser()); 							// pull information from html in POST
	app.use(express.methodOverride()); 						// simulate DELETE and PUT
});

// Routes
require('./routes.js')(app);

// Listen (start app with 'node server.js') 
app.listen(port);
console.log("App listening on localhost:" + port);