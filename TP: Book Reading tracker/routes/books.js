const express = require('express');
const router = express.Router();
const BookModel = require('../models/BookSchema');

// GET all books
router.get('/', async (req, res) => {
    const books = await BookModel.find();
    res.json(books);
});

// POST add new book
router.post('/', async (req, res) => {
    const data = req.body;
    data.finished = data.pagesRead >= data.pages;
    const newBook = new BookModel(data);
    await newBook.save();
    res.json(newBook);
});

// DELETE a book
router.delete('/:id', async (req, res) => {
    await BookModel.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

module.exports = router;
