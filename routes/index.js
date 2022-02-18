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
/* GET home page. */
router.get('/', function(req, res, next) {
  /* comment out res.render method */
  /* res.render('index', { title: 'Express' }); */
  res.redirect("/books")
});

/* Get Books */
router.get('/books', asyncHandler(async()))

module.exports = router;
