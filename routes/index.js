var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

exports.create = function(req, res){
  new Todo({
    content:req.body.content,
    update_at: Date.now()
  }).save(function(err, todo, count){
    res.redirect('/');
  });
}

exports.index = function(req, res){
  Todo.find(function(err, todos, count){
    res.render('index', 
      { 
        title: 'O que precisa ser feito?',
        todos: todos,
        count: count
      }
    );
  });
};

exports.destroy = function(req, res){
  Todo.findById(req.params.id, function(err, todo){
    todo.remove(function(err, todo){
      res.redirect('/');
    });
  });
}

exports.update = function(req, res){
  Todo.findById(req.params.id, function(err, todo){
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
  });
}

exports.done = function(req, res){
  Todo.find({'done': true}, function(err, todos, count){
    res.render('index', 
      { 
        title: 'O que precisa ser feito?',
        todos: todos
      }
    );
  });
}

exports.active = function(req, res){
  Todo.find({'done': false || null}, function(err, todos, count){
    res.render('index',
      {
        title: 'O que precisa ser feito?',
        todos: todos
      }
    );
  });
}

exports.destroyAll = function(req, res){
  Todo.remove({}, function(err) { 
    res.render('index',{
      title:'O que precisa ser feito?',
      todos: null
    });
  }); 
}