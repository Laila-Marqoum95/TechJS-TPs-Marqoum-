const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    pages: Number,
    status: { type: String, enum: ['Read', 'Re-read', 'DNF', 'Currently reading', 'Returned Unread', 'Want to read'] },
    price: Number,
    pagesRead: Number,
    format: { type: String, enum: ['Print', 'PDF', 'Ebook', 'AudioBook'] },
    suggestedBy: String,
    finished: { type: Boolean, default: false }
});

module.exports = mongoose.model('BookModel', bookSchema);
