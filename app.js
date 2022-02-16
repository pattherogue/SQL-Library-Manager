var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
/* "require" method import */
const sequelize = require('./models/index').sequelize;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

/* Test connection to the database and sync the model */
(async () => {
  try {
    /* use "sequelize.authenticate()" method to connect */
    await sequelize.authenticate();
    /* log out message SUCCESSFUL */ 
    console.log('Connection established');
  } catch (error) { 
    /* log out message UN-SUCCESSFUL */ 
    console.error('Connection Error - unable to connect', error);
  }
 
  try {
    /* use "sequelize.sync()" method to sync */
    await sequelize.sync();
    /* log out message SUCCESSFUL */ 
    console.log('Sync established');
  } catch (error) {
     /* log out message UN-SUCCESSFUL */ 
    console.error('Sync Error - unable to sync', error);
  }
    
}) ();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
