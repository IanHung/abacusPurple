/**
 * New node file
 */
exports.create = function(req, res){
  res.render('createarticle.html', { title: 'Express' });
};

exports.save = function(req, res){
	res.render('createarticle.html', { title: 'Express' });
}