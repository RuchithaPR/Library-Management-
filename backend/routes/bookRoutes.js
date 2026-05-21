const express = require('express');

const router = express.Router();

const Book = require('../models/Book');

// ---------- GET ALL BOOKS ----------
router.get('/books', async (req, res) => {

    try {

        const books = await Book.find();

        res.json(books);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

// ---------- ADD BOOK ----------
router.post('/books', async (req, res) => {

    try {

        console.log(req.body);

        const { title, author, image } = req.body;

        const newBook = new Book({
            title,
            author,
            image
        });

        await newBook.save();

        res.status(201).json(newBook);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

// ---------- BORROW BOOK ----------
router.put('/books/borrow/:id', async (req, res) => {

    try {

        await Book.findByIdAndUpdate(req.params.id, {
            borrowed: true
        });

        res.json({
            message: 'Book Borrowed'
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

// ---------- RETURN BOOK ----------
router.put('/books/return/:id', async (req, res) => {

    try {

        await Book.findByIdAndUpdate(req.params.id, {
            borrowed: false
        });

        res.json({
            message: 'Book Returned'
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

// ---------- DELETE BOOK ----------
router.delete('/books/:id', async (req, res) => {

    try {

        await Book.findByIdAndDelete(req.params.id);

        res.json({
            message: 'Book Deleted'
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;
