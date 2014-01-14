var routes = require('../routes/index.js');
var article = require('../routes/article.js');
var test = require('../routes/test.js');
var userAuth = require('../userAuth/routes.js');
var manifold = require('../routes/manifold.js')


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

module.exports = function(){
	var urlpatterns = { 			
			
			//a home page list view ala sbnation should be distinct from manifold consuming front end vs producing front end
			"index": {
				path: "/",
				get:  routes.index
			},
			
			//this should be a clean stream of news updates
			"news": {
				path: "/news",
				get: routes.news
			},
			
			//this should be a manifold with a collection of help articles metric based around what you might need help with.
			//maybe this should also be like the home page
			"help": {
				path: "/help",
				get: routes.help
			},
			
			//contact info and short blurb stating mission statement
			"about": {
				path: "/about",
				get: routes.help
			}
			
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
				
			},
			
			"login": {
				path: '/login',
				post: userAuth.login
				
			},
			
			'logout': {
				path: '/logout',
				post: userAuth.logout
			},
			
			"manifold": {
				path: '/manifold/prototype',
				get: 'manifold.prototype'	
			}
	
	};
	return urlpatterns;
};