const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

// Page d'inscription
router.get('/register', (req, res) => {
  res.render('register', { message: req.flash('error'), user: req.user });
});

// Handle inscription
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      req.flash('error', 'Utilisateur déjà existant');
      return res.redirect('/register');
    }

    const user = new User({ username, password });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erreur serveur');
    res.redirect('/register');
  }
});

// Page login
router.get('/login', (req, res) => {
  res.render('login', { message: req.flash('error'), user: req.user });
});

// Handle login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/books',
  failureRedirect: '/login',
  failureFlash: true
}));

// Logout
router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) return next(err);
    res.redirect('/login');
  });
});

module.exports = router;
