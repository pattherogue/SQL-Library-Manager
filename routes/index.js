var express = require('express');
var router = express.Router();
/* import Book model from "../models" folder */
var Book = require('../models').Books;


function asyncHandler(cb) {
  return async(req, res, next) => {
    try {
      await cb (req, res, next);
    } catch (error) {
      next(error);
    }
  }
}

/* Set Up Routes */
/* asynchronosuly use "findAll()" method on Book model */

/* Home route should redirect to "/books" route. */
router.get('/', function(req, res, next) {
  /* comment out res.render method */
  /* res.render('index', { title: 'Express' }); */
  res.redirect("/books")
});

/* Get Books - show full list of books */
router.get('/books', asyncHandler(async(req, res) => {
  /* store in variable */
  const books = await Book.findAll();
  /* log out books variable */
  console.log(books);
  /* "res.json()" method to display on webpage */
  res.render('index', { books: books });
}));

/* Post new book to database */
router.post('/books/new', asyncHandler(async (req, res) => {

}));


module.exports = router;
