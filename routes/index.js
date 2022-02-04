var express = require('express');
var router = express.Router();
var Book = require('../models').Book;

/* GET home page. */
router.get('/books', asyncHandler(req, res) {
  res.render('index', { books: books });
});

module.exports = router;
