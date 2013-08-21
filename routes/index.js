var mysql = require('mysql');
var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = 'root';
var MYSQL_PASS = '';
var DATABASE = 'rapido_ware';
var TABLE = 'todos';

var connection = mysql.createConnection({
    host: HOST,
    port: PORT,
    user: MYSQL_USER,
    password: MYSQL_PASS,
});
connection.query('use ' + DATABASE);
exports.create = function(req, res){
  connection.query('insert into todos (content, done) values ("' + req.body.content + '", "' + 0 + '")',
  function selectCb(err, results, fields) {
      if (err) throw err;
      else res.redirect('/');
  });
}

exports.index = function(req, res){
  connection.query('SELECT * FROM todos;', function (err, todos, count) {
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
  /*Todo.findById(req.params.id, function(err, todo){
    todo.remove(function(err, todo){
      res.redirect('/');
    });
  });*/
  connection.query('DELETE FROM todos WHERE id='+req.params.id, function(err, todo){
    res.redirect('/');
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
  connection.query('DELETE * FROM todos', function(err){
    res.render('index', 
      { 
        title: 'O que precisa ser feito?',
        todos: null
      }
    );
  }); 
}