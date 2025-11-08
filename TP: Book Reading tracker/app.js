const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const booksRouter = require('./routes/books');

const app = express();

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/bookTracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/books', booksRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
