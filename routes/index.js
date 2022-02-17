var express = require('express');
var router = express.Router();
/* import Book model from "../models" folder */
var Book = require('../models').Books;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
