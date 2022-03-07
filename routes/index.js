var express = require('express');
var router = express.Router();
/* import Book model from "../models" folder */
var Book = require('../models').Book;


function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb (req, res, next);
    } catch (err) {
      next(err);
    }
  }
}

/* Set Up Routes */
/* asynchronosuly use "findAll()" method on Book model */

/* Home route should redirect to "/books" route. */
router.get("/", (req, res, next) => {
  /* comment out res.render method */
  /* res.render('index', { title: 'Express' }); */
  res.redirect("/books");
});

/* Get Books - show full list of books */
router.get('/books', asyncHandler(async (req, res) => {
  /* store in variable */
  const books = await Book.findAll();
  /* log out books variable */
  console.log(books);
  /* "res.json()" method to display on webpage */
  res.render('index', { books, title: "Bookcs" });
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
    book = await Book.create(req.body);
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
   const book = await Book.findByPk(req.params.id);
   if (book) {
    /* "res.json()" method to display on webpage */
     res.render('update-book', { book, title: book.title });
   } else {
     res.render('page-not-found');
   }
  })
);
  
/* Post "/books/:id" - updates book info in database */
router.post('/books/:id', asyncHandler(async(req, res) => {
  let book;
  try {
    /* store in variable */
    book = await Book.findByPk(req.params.id);
    if (book) {
      await book.update(req.body);
      /* "res.json()" method to display on webpage */
      res.redirect('/books');
    } else {
      res.render('page-not-found');
    }

  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      book.id = req.params.id;
      /* "res.json()" method to display on webpage */
      res.render('update-book', { book, errors: error.errors, title: 'Edit Book'});
    } else {
      throw error;
    }
  }
}));

/* Post "/books/:id/delete" - deletes a book (cannot be undone) */
router.post('/books/:id/delete', asyncHandler(async(req, res, next) => {
  /* store in variable */
  const book = await Book.findByPk(req.params.id);
  /* create new "test" book to test deleting */
  if (book) {
    await book.destroy();
    /* "res.json()" method to display on webpage */
    res.redirect('/books');
  } else {
    res.render('page-not-found');
  }

}));




module.exports = router;
