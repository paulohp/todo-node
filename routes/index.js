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
  Todo.find(req.params.id).success(function(todo){
    if(req.body.done == 'on') {
      todo.updateAttributes({
        done: 1
      }).success(function(){
        res.redirect('/');
      });
    } else{
      todo.updateAttributes({
        done: 0
      }).success(function(){
        res.redirect('/');
      });
    }
  });
}

exports.done = function(req, res){
  Todo.findAll({ where: {done: 1} }).success(function(todos) {
    res.render('index', 
      { 
        title: 'O que precisa ser feito?',
        todos: todos
      }
    );
  });
}

exports.active = function(req, res){
  Todo.findAll({ where: {done: 0} }).success(function(todos) {
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