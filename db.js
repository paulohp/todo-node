var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Todo = new Schema({
  done  :Boolean,
  content  :String,
  update_at: Date
});

mongoose.model('Todo', Todo);
mongoose.connect('mongodb://localhost/express-todo');