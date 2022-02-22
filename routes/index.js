var express = require('express');
const res = require('express/lib/response');
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

/* get "/books" - create new book form */
router.get('/books/new', asyncHandler(async (req, res) => {
    /* store in variable */
  const books = await Book.findAll();
    /* log out books variable */
    console.log(books);
    /* "res.json()" method to display on webpage */
  res.render('new-book');
}));

/* post "/book/new" - post new book to database */ 
router.post('books/new', asyncHandler(async(req, res) => {
  let book;
  try {
     /* store in variable */
    book = await Book.findByPk(req.params.id);
     /* "res.json()" method to display on webpage */
    res.redirect('/books');
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      /* store in variable */
      book = await Book.build(req.body);
      /* "res.json()" method to display on webpage */
      res.render('new-book', { book, errors: error.errors, title: 'New Book'});
    } else {
      throw error;
    }
  }

}));

/* Get "/books/:id" - show books in detail form */
router.get('/books/:id', asyncHandler(async(req, res) => {
   /* store in variable */
   const book = await BookfindByPk(req.params.id);
   if (book) {
       /* "res.json()" method to display on webpage */
     res.render('update-book', { book, title: book.title });
   } else {
     res.render('page=not-found');
   }
  })
);
  
/* Post "/books/:id" - updates book info in database */
router.post('/books/:id', asyncHandler(async(req, res) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if (book) {
      await book.update(req.body);
    }
  }
}))



  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      book.id = req.params.id;
      /* "res.json()" method to display on webpage */
      res.render('update-book', { book, errors: error.errors, title: 'Edit Book'});

    }
  }

module.exports = router;
