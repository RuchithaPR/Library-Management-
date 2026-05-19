const express = require('express');
const router = express.Router();

const Book = require('../models/Book');

router.get('/books', async (req, res) => {

    const books = await Book.find();

    res.json(books);
});

router.post('/books', async (req, res) => {

    const newBook = new Book(req.body);

    await newBook.save();

    res.json(newBook);
});

router.put('/books/borrow/:id', async (req, res) => {

    await Book.findByIdAndUpdate(req.params.id, {
        borrowed: true
    });

    res.json({ message: 'Book Borrowed' });
});

router.put('/books/return/:id', async (req, res) => {

    await Book.findByIdAndUpdate(req.params.id, {
        borrowed: false
    });

    res.json({ message: 'Book Returned' });
});

router.delete('/books/:id', async (req, res) => {

    await Book.findByIdAndDelete(req.params.id);

    res.json({ message: 'Book Deleted' });
});

module.exports = router;