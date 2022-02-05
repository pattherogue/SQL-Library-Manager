var express = require('express');
var router = express.Router();
var Book = require('../models').Book;

function asyncHandler(cb) {
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch (error) {
      next(error);
    }
  }
}

/* GET Home Route. */
router.get('/', (req, res, next) => {
  res.redirect("/books")
});

/* Get Books */
router.get('/books', asyncHandler(async (req, res) => {
  const books = await Book.findAll();
  res.render('index', { books: books });
}));

/* Render Book Form */
render.get('/books/new', asyncHandler(async(req, res) => {
  const books = await Book.findAll();
  res.render('new-book');
}));

module.exports = router;
