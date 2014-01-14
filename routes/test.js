/**
 * New node file

va
 */
//use method for setting context and to clean up
var contextSetter = require('../userAuth/middleware').loginErrorContext;
exports.test = function (req, res){
	//console.log(req.app.locals.fullUrl('test.form') );
	//console.log(res.locals.url('test.form') );
	//console.log(res.locals);
	console.log("Asdf"+res.locals.messages);
	var context = {title: "test123", testingError: res.locals.messages };
	res.render('test.html', context );
	
	console.log(res.locals.messages);
}

exports.testSubmit = function (req, res){
	console.log(req.body.testvalue);
	console.log(res.locals);
	res.render('test.html', {title: "test123"});
	
}