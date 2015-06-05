var Mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

TodoSchema = new Mongoose.Schema(
{todo_url : {type : String},
 password : {type : String, default : null},
		 todo : [{
			id: {type : Number },
			category: {type : String},
			items: [{
				id : {type : Number},
				task : {type : String, required : true },
				date : { type : Date, required : false },
				done : { type : Boolean, required : true }
			}]
		}]
});

TodoSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

TodoSchema.methods.hashPassword = function(password) {
  console.log('in hash password');
  console.log(password);
  var self = this;
  bcrypt.hash(password,null,null,function(err,hash) {
    if (err) {
      return next(err);
    }
    self.password = hash;
  });
};

module.exports = TodoSchema
