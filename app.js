
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var nunjucks = require('nunjucks');
var urls = require('urls');
var article = require('./routes/article');

var app = express();

nunjucks.configure('views', {
	autoescape: true, 
	express: app
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade'); I'll be using nunjucks
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//I'll be using urls to set routes.
//app.get('/', routes.index);
//app.get('/users', user.list);

urls([
	{ pattern: "/", view: routes.index, name: "index" },
	{ pattern: "/create/article/", view: article.create, name:"newArticle" }
      ], app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
