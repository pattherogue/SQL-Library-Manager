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

/* GET home page. */
router.get('/books', asyncHandler(async (req, res) => {
  const books = await Book.findAll();
  res.render('index', { books: books });
}));

module.exports = router;
