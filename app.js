var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ECT = require('ect');
var compression = require('compression');

var index = require('./routes/index');
var login = require('./routes/login');
var user = require('./routes/user');
var gallery = require('./routes/gallery');
var image = require('./routes/image');

var app = express();

// view engine setup
app.engine('ect', ECT({
  watch: true,
  root: __dirname + '/views',
  ext: '.ect'
}).render);
app.set('view engine', 'ect');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: 2592000000
}));

// Use helmet to secure Express headers
app.disable('x-powered-by');

// routing
app.use('/', index);
app.use('/login', login);
app.use('/user', user);
app.use('/gallery', gallery);
app.use('/image', image);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
