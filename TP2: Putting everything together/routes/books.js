const express = require('express');
const router = express.Router();
const BookModel = require('../models/BookSchema');

// Middleware pour vérifier que l'utilisateur est connecté (si vous utilisez Passport)
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

// 1️⃣ Page qui affiche tous les livres et le formulaire
router.get('/books', isAuthenticated, async (req, res) => {
    const books = await BookModel.find();
    res.render('books', { user: req.user, books });
});

// 2️⃣ Ajouter un livre depuis le formulaire
router.post('/books/add', isAuthenticated, async (req, res) => {
    const data = req.body;
    data.finished = Number(data.pagesRead) >= Number(data.pages);
    const newBook = new BookModel(data);
    await newBook.save();
    res.redirect('/books');
});

// 3️⃣ Supprimer un livre
router.delete('/books/:id', isAuthenticated, async (req, res) => {
    await BookModel.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

module.exports = router;
