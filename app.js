var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressSession = require('express-session');
var dbConfig = require('./routes/db.js');
var routes = require('./routes/index');
var users = require('./routes/users');

//Get DB Connection errors
var db = mongoose.connection;
db.on('error', console.error);

mongoose.connect(dbConfig.url);



var app = express();

 
// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(expressSession({secret: '123abc',resave: true,
saveUninitialized: true}));

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
