/**
 * New node file
 */
var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var config = require('../config')();

var userSchema = new mongoose.Schema({
	username: { type: String, trim: true, required: true, unique: true}, //no extra white spaces in username
	email: {type: String, required: true, unique: true},
	password: {value: {type: String, required: true }, SALT_WORK_FACTOR: { type: Number, default: config.SALT_WORK_FACTOR }, strategy: { type:String, default: config.currentStrategy}  },
	profile: { firstname:String, lastname:String },
	groups: [],
	user_permissions: [],
	is_staff: Boolean,
	is_active: Boolean,
	is_superuser: Boolean
});

//Middleware to hash password
userSchema.pre('save', function(next){
	var user = this;
	if(!user.isModified('password')) {
		return next();
	}
	
	bcrypt.genSalt(config.SALT_WORK_FACTOR, function(err, salt){
		if(err){
			return next(err);
		}
		
		bcrypt.hash(user.password, salt, function(err, hash){
			if(err){
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
	
});

//Password verification method

userSchema.methods.comparePassword = function(candidatePassword, cb){
	bcrypt.compare(candidatePassword, this.password.value, function(err, isMatch){
		if(err){
			return cb(err);
		}
		cb(null, isMatch);
	});
};

//register model


exports.User = mongoose.model('User', userSchema);
