var routes = require('../routes/index.js');
var article = require('../routes/article.js');
var test = require('../routes/test.js');


/*module.exports = function(attachDB){
	var urlpatterns =  [
	  	{ pattern: "*", view: attachDB, name: "db" },
	  	{ pattern: "/", view: routes.index, name: "index" },
	  	{ pattern: "/create/article/", view: article.create, name:"newArticle" },
	  	{ pattern: "/test/", view: test.test, name: "test"  },
	  	{ pattern: "/test/form/", view: test.testSubmit, name: "testform" }
	        ];
	return urlpatterns;
};*/

module.exports = function(attachDB){
	var urlpatterns = { 
			"db": {
				path: "*",
				all: attachDB
			},
			
			"index": {
				path: "/",
				get:  routes.index
			},
			
			"newArticle": {
				path: "/create/article/",
				get: article.create
			},
			
			"test": {
				path: "/test/",
				get: test.test
			},
			
			"test.form": {
				path: "/form/",
				post: test.testSubmit
				
			}
	
	};
	return urlpatterns;
};