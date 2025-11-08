const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/books');

const app = express();

// Connexion MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/booktracker2')
  .then(() => console.log('MongoDB connecté à booktracker2'))
  .catch(err => console.log(err));

// Middleware
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Config Passport
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user) return done(null, false, { message: 'Utilisateur introuvable' });
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return done(null, false, { message: 'Mot de passe incorrect' });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Routes
app.use(authRoutes);
app.use(booksRoutes);

// Serveur
app.listen(3000, () => console.log('Serveur lancé sur http://localhost:3000'));
