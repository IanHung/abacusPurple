
/**
 * Module dependencies.
 */
//defining variables
var express = require('express');
var http = require('http');
var path = require('path');
var nunjucks = require('nunjucks'); //nunjucks template engine
//var urls = require('urls'); //creates named url patterns THis is dead using shrinkroute instead
var shrinkroute = require('shrinkroute');
var passport = require('passport'); //passport capable authentication to integrate oAUTH if desired
var bcrypt = require('bcrypt'); //encryption hash for local authentication strategy
var MongoClient = require('mongodb').MongoClient;
var config = require('./config')(); //config file with database values depending on environment
var urlpatterns = require('./urlpatterns'); //configured url patterns
var MongoStore = require('connect-mongo')(express) //mongo based session store

//mongoose.connect('mongodb://localhost');

/*
//Check for database connection
var db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once('open', function callback(){
	//yay
});
*/
var app = express();


//configure nunjucks
nunjucks.configure('views', {
	autoescape: true, 
	express: app
});

// all environments
app.set('port', config.port);
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade'); I'll be using nunjucks
//app.use(express.favicon()); I'll need to set this later
app.use(express.logger('dev'));
//gzips files
app.use(express.compress());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());


//the following is required for sessions
app.use(express.cookieParser());

MongoClient.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/abacuspurple', function(err, mondb){
	if(err) {
		console.log('Sorry, there is no mongo db server running.');
	} else {
		
	app.use(express.session({
		secret: process.env.SECRET_KEY,
		store: new MongoStore({
			db: mondb
		})
	}));
	//csrf() needs sessions support needs to be below sessions
	app.use(express.csrf());
	//the below is required because express is dumb and doesn't automatically add a local csrf variable
	app.use(function(req, res, next){
		res.locals.csrf_token = req.csrfToken();
		next();
	});
	app.use(app.router);

	app.use(express.static(path.join(__dirname, 'public')));
	
	
	var attachDB = function(req, res, next) {
		req.db = mondb;
		next();
	};
	var shrinkr = shrinkroute( app, urlpatterns(attachDB) );
	/*console.log(shrinkr.url("test"));
	var asdf = function(str){
		return shrinkr.url(str);
	};
	*/

	app.locals.url = function(str){
		return shrinkr.url(str);
	};

	app.locals.fullUrl = function(str){
		return shrinkr.url(str);
	};

	//app.use( shrinkr.middleware ); Can't get middleware to work will create my own
	//console.log(asdf('test.form'));
	
	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}
	
	//I'll be using urls to set routes.
	//app.get('/', routes.index);
	//app.get('/users', user.list);
	

		//urls(urlpatterns(attachDB), app);
	


	
		
		http.createServer(app).listen(app.get('port'), function(){
			  console.log('Express server listening on port ' + app.get('port'));
			});
	}
});

