
/*
 * GET home page.
 */

exports.index = function(req, res){
	console.log(req.user);
  res.render('index.html', { title: 'Express' });
};