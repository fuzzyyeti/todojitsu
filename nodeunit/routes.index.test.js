var indexRoutes = require('../routes/index.js');

exports.testAddTodo = function(test) {
var d = new Date();
var req = {
  body : {
    due : d.toString(),
    done : false,
    description : 'Learn TDD'
  }
};

var Todo = function(obj) {
  this.data = obj;
  this.save = function(callback) {
    test.equals(obj, req.body);
    callback(null, this);
  };
};

var fn = indexRoutes.addTodo(Todo);

var res = {
  json : function(obj) {
    test.equals(todos, obj.todos);
    test.equals(2, todos.length);

    test.equals(req.body.description, todos[1].description);
    test.equals(d.toString(), todos[1].due);
    test.ok(!todos[1].done);
    test.equals(req.body, obj.todo.data);

    test.expect(2);
    test.done();
  }
};


  fn(req, res);

};
