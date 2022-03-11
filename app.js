var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
/* "require" method import */
const sequelize = require('./models/index').sequelize;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { create } = require('domain');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

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
    
})();

const port = 3000;

/* 404 error handle */
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// Gloabl Error Handler

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.render("page-not-found", { err });
  } else {
    /* log status and message to console */
    console.log('Status 500 - Global error handler');
    /* user friendly message */
    err.message = err.message || 'Error with server';
    /* set "err.status" to 500 */
    /* render "error" template */ 
    res.locals.error = err;
    res.status(err.status || 500).render('error', { err });

  }
  
});

module.exports = app;
