var routes = require('../routes/index.js');
var article = require('../routes/article.js');
var test = require('../routes/test.js');


module.exports = function(attachDB){
	var urlpatterns =  [
	  	{ pattern: "*", view: attachDB, name: "db" },
	  	{ pattern: "/", view: routes.index, name: "index" },
	  	{ pattern: "/create/article/", view: article.create, name:"newArticle" },
	  	{ pattern: "/test/", view: test.test, name: "test"  },
	  	{ pattern: "/test/form/", view: test.testSubmit, name: "testform" }
	        ];
	return urlpatterns;
};