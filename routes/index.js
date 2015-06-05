module.exports = function(app,Todo){
	app.get('/todos/:todo_url',getTodoList(Todo));
	app.get('/todos/:todo_url/:password',getTodoList(Todo));
  app.post('/password/:todo_url',setPassword(Todo));
	app.post('/todos/:todo_url',updateTodoList(Todo));
  app.all('*',function(req,res) {
   res.sendfile('public/index.html');
  });
	function checkPassword(Todo,req){
		Todo.findOne({todo_url: req.params.todo_url}, function(error, todo_list) {
			if (todo_list){
				if (todo_list.password === null){
					return null;
				} else if (req.params.password){
						if (todo_list.validPassword(req.params.password)) {
							return true;
						} else {
							return false;
						}
				} 
				} else {
					return false;
			};
		});
	};
  function getTodoList(Todo){
    return function(req,res){
      Todo.findOne({todo_url: req.params.todo_url}, function(error, todo_list) {
        if (todo_list){
            if (todo_list.password === null){
              res.json(todo_list.todo);
            } else if (req.params.password){
              if (todo_list.validPassword(req.params.password)) {
                res.json(todo_list.todo);
              } else {
                res.send(401,'bad password'); 
              }
            } else {
             res.send(401,'no password'); 
            }
          } else {
          res.json([]);
  			}
      });
    };
  };
  function setPassword(Todo) {
    return function(req, res) {
      console.log('looking for list');
      Todo.findOne({todo_url:req.params.todo_url},function(err,todo_list){
      if (todo_list.password) {
        res.send(401,'password already set');
      } else {
        todo_list.hashPassword(req.body.passwd);
        todo_list.save();
        res.send('password set');
      }
    }
  )}};
  function updateTodoList(Todo) {
    return function(req, res) {
      Todo.findOne({todo_url:req.params.todo_url},function(err,todo_list){
					if(!todo_list) {
						console.log("creating todo list document");
						var mytodolist = {todo_url:req.params.todo_url,
													todo: req.body}
						Todo.create(mytodolist);
						res.send('created document');	
					}
					else {
						todo_list.todo = req.body;
						todo_list.save(function(err,whatever){
							if (err) {
								console.log('error in save');
								res.send('error saving document');	
							} else {
								console.log('saved document');
								res.send('saved document');	
							}
						});
					}
				});
    };
};
};
