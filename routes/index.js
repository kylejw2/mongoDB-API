const {
  readBooks,
  createBook,
  updateBook,
  replaceBook,
  deleteBook
} = require('../data/books.js');

var express = require('express');
var router = express.Router();

/* GET home page and all books currently available. */
router.get('/', function(req, res, next) {
  let bookData;
  readBooks().then((data) => {
    res.render('index', { result: data })
  });
});

module.exports = router;
