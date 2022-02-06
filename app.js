var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sequelize = require('./models/index').sequelize;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection properly established.');
  } catch (error) {
    console.log('Database connection error', error);

    try {
      await sequelize.sync();
      console.log('Database successfully synced!');
    } catch (error) {
      console.log('Database sync error', error);
    }
  }
})();

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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// 404 error handler
app.use(function(err, req, res, next) {
  // create new Error() 
  // user friendly message 
  const err = new Error("Page does not exist.");
  // status property to 404
  error.status = 404;
  res.status(404).render("page-not-found", { error })
});

  // Global error handler
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
