var Todo = app.get('models').Todo;

exports.create = function(req, res){
  Todo.create({content: req.body.content, done:0}).success(function(todos, create){
    res.redirect('/');
  });
}

exports.index = function(req, res){
  Todo.all().success(function(todos) {
    res.render('index', {
      title: 'O que precisa ser feito?',
      todos: todos
    });
  })
};

exports.destroy = function(req, res){
  Todo.find(req.params.id).success(function(todo){
    todo.destroy().success(function(todo){
      res.redirect('/');
    });
  });
}

exports.update = function(req, res){
  /*Todo.findById(req.params.id, function(err, todo){
    if (req.body.done == 'on') {
      todo.done = true;
      todo.save(function(err, todo, count){
        res.redirect('/');
      });
    } else {
      todo.done = false;
      todo.save(function(err, todo, count){
        res.redirect('/');
      });
    };
  });*/
  if (req.body.done == 'on') {
    connection.query('UPDATE todos SET done=1 WHERE id='+req.params.id, function(err){
      res.redirect('/');
    });
  } else {
    connection.query('UPDATE todos SET done=0 WHERE id='+req.params.id, function(err){
      res.redirect('/');
    });
  };
}

exports.done = function(req, res){
  connection.query('SELECT * FROM todos WHERE done = 1', function(err, todos, count){
    res.render('index', 
      { 
        title: 'O que precisa ser feito?',
        todos: todos
      }
    );
  });
}

exports.active = function(req, res){
  connection.query('SELECT * FROM todos WHERE done = 0', function(err, todos, count){
    res.render('index', 
      { 
        title: 'O que precisa ser feito?',
        todos: todos
      }
    );
  });
}

exports.destroyAll = function(req, res){
  Todo.findAll().success(function(todos){
    todos.destroy().success(function(){
      res.redirect('/');
    });
  });
}