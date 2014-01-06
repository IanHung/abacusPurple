/**
 * New node file
 */
exports.test = function (req, res){
	//console.log(req)
	res.render('test.html', {title: "test123"});
}

exports.testSubmit = function (req, res){
	console.log(req.body.testvalue);
	console.log(req.db);
	res.render('test.html', {title: "test123"});
	
}