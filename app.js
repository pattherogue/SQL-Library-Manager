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
app.use((req, res) => {
  /* create a new "Error()" */
  /* User friendly mesage */
  const error = new Error("Unable to locate your desired page!")
  /* Set status property to 404 */
  error.status = 404;
  /* render "page-not-found" */
  res.status(404).render("page-not-found", { error })

});


// Gloabl Error Handler
/* set "err.status" to 500 */
/* user friendly message */
/* log status and message to console */
/* render "error" template */ 
app.use(function(err, req, res, next) {
  if (err.status === 404) {
    res.render("page-not-found", { error });
  }
});

module.exports = app;
