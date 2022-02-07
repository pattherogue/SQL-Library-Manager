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

/* get / - Home Route. */
router.get('/', (req, res, next) => {
  res.redirect("/books")
});

/* get /books */
router.get('/books', asyncHandler(async (req, res) => {
  const books = await Book.findAll();
  res.render('index', { books: books });
}));

/* get /books/new */
render.get('/books/new', asyncHandler(async(req, res) => {
  const books = await Book.findAll();
  res.render('new-book');
}));

/* get /books/:id */
router.get('/books/:id, ')

module.exports = router;
