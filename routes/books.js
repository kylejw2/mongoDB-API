const {
  readBooks,
  createBook,
  updateBook,
  replaceBook,
  deleteBook
} = require('../data/books.js');

var express = require('express');
var router = express.Router();

/* GET books listing. */
router.get('/', function(req, res, next) {
  readBooks().then(data => {
    res.send(data);
  });
});
/* GET a single book given the year. */
router.get('/:year', function(req, res, next) {
  readBooks(+req.params.year).then(data => {
    res.send(data);
  });
});

// POST a book to the database
router.post('/', function(req, res, next) {
  const body = req.body;
  createBook(body).then(data => {
    res.send(data);
  });
});

// PUT (update/replace) a book in the database
router.put('/:id', function(req, res, next) {
  const body = req.body;
  replaceBook(req.params.id, body).then(data => {
    res.send(data);
  });
});

// PATCH (update/modify) a book in the database
router.patch('/:id', function(req, res, next) {
  const body = req.body;
  updateBook(req.params.id, body).then(data => {
    res.send(data);
  });
});

// DELETE a book in the database
router.delete('/:id', function(req, res, next) {
  const body = req.body;
  deleteBook(req.params.id).then(data => {
    res.send(data);
  });
});

module.exports = router;
