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

router.post('/books/new', asyncHandler(async(req, res) => {

}))

/* get /books/new */
render.get('/books/new', asyncHandler(async(req, res) => {
  const books = await Book.findAll();
  res.render('new-book');
}));

/* get /books/:id */
router.get('/books/:id', 
  asyncHandler(async (req, res) => {
    let book;
    try {
      book = await Book.create(req.body);
      res.redirect('/books');
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        book = await Book.build(req.body);
        res.render('new-book', {book, errors: error.errors, title: 'New Book'});
      } else {
        throw error;
      }
    }
  }));

  /* post /books/:id */
  router.post('/books/:id', asyncHandler(async(req, res) => {
    let book;
    try {
      book = await Book.findByPk(req.params.id);
      if (book) {
        await book.update(req.body);
        res.redirect('/books');
      } else {
        res.render('page-not-found');
      }
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        book = await Book.build(req.body);
        book.id = req.params.id;
        res.render('update-book', { book, title: book.title});
      } else {
        res.render('page-not-found');
      }
    }
  }))
module.exports = router;
