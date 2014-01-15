
/*
 * GET home page.
 */

exports.index = function(req, res){
	console.log(req.user);
  res.render('index.html', { title: 'Express' });
};

exports.news = function(req,res){
	
};

exports.help = function(req,res){
	
}

exports.about = function(req,res){
	
}

