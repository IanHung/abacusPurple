var passport= require('passport');

exports.login = function(req, res, next) {
	  passport.authenticate('local', function(err, user, info) {
		    if (err) { return next(err) }
		    if (!user) {
		      req.session.messages =  [info.message];

		      return res.redirect('back')
		      
		      
		    }
		    req.logIn(user, function(err) {
		      if (err) { return next(err); }
		      return res.redirect('/');
		    });
		  })(req, res, next);
		}

exports.logout = function(req, res){
	  req.logout();
	  res.redirect('/');
	}