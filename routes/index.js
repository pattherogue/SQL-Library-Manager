var express = require('express');
var router = express.Router();
/* import Book model from "../models" folder */
var Book = require('../models').Books;

/* GET home page. */
router.get('/', function(req, res, next) {
  /* comment out res.render method */
  /* res.render('index', { title: 'Express' }); */
  res.redirect("/books")
});

module.exports = router;
