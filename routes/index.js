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
  /*new Todo({
    content:req.body.content,
    update_at: Date.now()
  }).save(function(err, todo, count){
    res.redirect('/');
  });*/
  connection.query('insert into todos (content, done) values ("' + req.body.content + '", "' + 0 + '")',
  function selectCb(err, results, fields) {
      if (err) throw err;
      else res.redirect('/');
  });
}

exports.index = function(req, res){
  /*Todo.find(function(err, todos, count){
    res.render('index', 
      { 
        title: 'O que precisa ser feito?',
        todos: todos,
        count: count
      }
    );
  });*/
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
}

exports.done = function(req, res){
  /*Todo.find({'done': true}, function(err, todos, count){
    res.render('index', 
      { 
        title: 'O que precisa ser feito?',
        todos: todos
      }
    );
  });*/
}

exports.active = function(req, res){
  /*Todo.find({'done': false || null}, function(err, todos, count){
    res.render('index',
      {
        title: 'O que precisa ser feito?',
        todos: todos
      }
    );
  });*/
}

exports.destroyAll = function(req, res){
  /*Todo.remove({}, function(err) { 
    res.render('index',{
      title:'O que precisa ser feito?',
      todos: null
    });
  });*/ 
}