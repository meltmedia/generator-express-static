/**
 * Setup and run our Express server
 *
 * This server is used during development and is not necessary for production
 * once all static files have been rendered out
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var writer = require('express-writer');
<% if (viewEngine != 'jade') { %>
var cons = require('consilidate');
<% } %>
<% if (cssEngine == 'stylus') { %>
var stylus = require('stylus');
<% } %>
<% if (cssEngine == 'sass') { %>
var stylus = require('node-sass');
<% } %>
<% if (cssEngine == 'less') { %>
var lessMiddleware = require('less-middleware');
<% } %>

var app = express();
var server;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
<% if (viewEngine == 'hbs') { %>
// assign the swig engine to .html files
app.engine('html', cons.handlebars);
app.set('view engine', 'html');
<% } else {%>
app.set('view engine', 'jade');
<% } %>

<% if (cssEngine == 'sass') { %>
app.use(sass.middleware({
  src: __dirname + '/resources/',
  dest: __dirname + '/public/',
  debug: true,
  force: true
}));
<% } else if (cssEngine == 'less') { %>
app.use(lessMiddleware({
  src: __dirname + '/resources/',
  dest: __dirname + '/public/',
  debug: true,
  force: true
}));
<% } else if (cssEngine == 'css') {%>
<% } else { %>
app.use(stylus.middleware({
  src: __dirname + '/resources/',
  dest: __dirname + '/public/',
  debug: true,
  force: true
}));
<% } %>
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {

  app.use(express.errorHandler());

// Our environment for static file rendering
} else if ('dist' == app.get('env')) {

  app.use(writer.watch);

}

// Out static site's routes
app.get('/', routes.index);

server = http.createServer(app);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  console.log('Node environment is ' + app.get('env'));
});
