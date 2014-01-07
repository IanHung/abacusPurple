/**
 * New node file
 */
exports.test = function (req, res){
	console.log(req.app.locals.fullUrl('test.form') );
	//console.log(res.locals.url('test.form') );
	//console.log(res.locals);
	res.render('test.html', {title: "test123"});
}

exports.testSubmit = function (req, res){
	console.log(req.body.testvalue);
	console.log(res.locals);
	res.render('test.html', {title: "test123"});
	
}