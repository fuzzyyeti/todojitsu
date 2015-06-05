var LocalStrategy = require('passport-local').Strategy;
module.exports = function(passport,db,email_validator,User) {
  passport.use('local-signup', new LocalStrategy(
    function(username,password,done) {
      console.log("signing up");
      console.log(username);
      console.log(password);
      User.findOne({username : username }, function(err, user){
				console.log("in here");
        if (err){
					console.log("err");
          return done(err);
				}
        if (user) {
					console.log("exists");
          return done(null, false, {message: "user name already exists"});
        } else {
					console.log("new");
					if (email_validator.validate(username)){
          var newUser = new User();
          newUser.username = username;
          newUser.hashPassword(password);
          newUser.hashAuthenticate();
          newUser.confirmed = false;
          newUser.save(function(err){
            if (err)
              throw err;
            return done(null,newUser,{message:'got it'});
          });
				}
				else{
				return done(null,false,{message: "invalid email address"});
				}
      }
    });
  })); 

  passport.use('local', new LocalStrategy(
    function(username, password, done) {
      console.log('in local strategy function');
      User.findOne({username: username }, function(err, user){
        
        if (err) 
          return done(err);
        if (!user) {
          return done(null, false, {message:'No account with that username'});
        } 
        if (user.validation) {
          console.log("hi");
          return done(null,false,{message:'Accound not validated'});
        }
        if (!user.validPassword(password)){
          return done(null, false, {message:'Invalid password'});
        }
        return done(null, user,{message:'Valid Login'});
      });
    }
  ));

  passport.serializeUser(function(user,done){
    done(null,user._id);
  });

  passport.deserializeUser(function(id,done){
    User.findOne({_id:id}, function(err,user) {
      done(err,user);
    });
  });
}
