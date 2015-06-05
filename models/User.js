var Mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var salt = "sdfkjlkje";

module.exports = function(db,mailer) {
	UserSchema = new Mongoose.Schema({
		username : {type : String, required : true },
		password : { type : String, required : true },
		validation: { type : String},
		recoverPassWord : { type : String}
	});


	UserSchema.methods.validPassword = function(password) {
		return bcrypt.compareSync(password, this.password);
	};

	UserSchema.methods.hashPassword = function(password) {
		var user = this;
		bcrypt.hash(password,null,null,function(err,hash) {
			if (err)
				return next(err);
			user.password = hash;
		});
	}

	UserSchema.methods.hashAuthenticate = function() {
		var user = this;
    var hash = crypto.createHash('md5').update((new Date()).toString() + Math.random.toString()).digest('hex');
    user.validation = hash;
    mailer.sendMail("mattmccarn@gmail.com",hash);
  };

	


  return db.model('users',UserSchema); 
};
