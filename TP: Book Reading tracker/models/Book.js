class Book {
    constructor({title, author, pages, status, price, pagesRead, format, suggestedBy}) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status; // Read, Re-read, DNF, Currently reading, Returned Unread, Want to read
        this.price = price;
        this.pagesRead = pagesRead;
        this.format = format; // Print, PDF, Ebook, AudioBook
        this.suggestedBy = suggestedBy;
        this.finished = pagesRead >= pages ? 1 : 0;
        this.id = Date.now(); // simple unique id
    }

    currentlyAt() {
        return `${((this.pagesRead / this.pages) * 100).toFixed(2)}%`;
    }

    deleteBook(bookList) {
        return bookList.filter(book => book.id !== this.id);
    }

    updatePagesRead(newPagesRead) {
        this.pagesRead = newPagesRead;
        this.finished = this.pagesRead >= this.pages ? 1 : 0;
    }
}

module.exports = Book;
