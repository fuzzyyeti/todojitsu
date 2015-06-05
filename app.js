
/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var http = require('http');
var TodoSchema = require('./models/Todo.js');
//var UserSchema = require('./models/User.js').UserSchema;
var db = mongoose.createConnection('localhost','mytestapp');
var Todo = db.model('todos',TodoSchema);
console.log("got here");
var app = express();
app.configure(function() {

  app.use(express.favicon(path.join(__dirname,'/public/img/star.ico')));
  // all environments
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({secret: 'okay' }));
  app.use(express.static(path.join(__dirname, 'public')));
//  app.use(passport.initialize());
 // app.use(passport.session());
  app.use(app.router);

});          

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./routes/index.js')(app,Todo);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
