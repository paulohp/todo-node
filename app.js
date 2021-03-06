
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.set('models', require('./models'));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
var routes = require('./routes');
app.get('/', routes.index);
app.post('/create', routes.create);
app.get('/destroy/:id', routes.destroy);
app.post('/update/:id', routes.update);
app.get('/done', routes.done);
app.get('/active', routes.active);
app.get('/clean', routes.destroyAll);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
