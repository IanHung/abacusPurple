exports.ensureAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()){return next();}
	res.redirect('/login');
}

//a helper to reset the error message for login sessions
exports.loginErrorContext = function(req) {
	var tempErrorMessage = req.session.messages;
	req.session.messages = "";
	return tempErrorMessage;
}