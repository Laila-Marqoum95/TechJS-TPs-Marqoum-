const form = document.getElementById('bookForm');
const booksList = document.getElementById('booksList');
const totalReadEl = document.getElementById('totalRead');
const totalPagesEl = document.getElementById('totalPages');

// Fetch books from server
async function fetchBooks() {
    const res = await fetch('/books');
    const books = await res.json();
    renderBooks(books);
}

// Render books
function renderBooks(books) {
    booksList.innerHTML = '';
    let totalRead = 0;
    let totalPages = 0;

    books.forEach(book => {
        totalRead += book.finished ? 1 : 0;
        totalPages += book.pagesRead;

        const li = document.createElement('li');
        li.className = "p-2 bg-white rounded shadow flex justify-between items-center";
        li.innerHTML = `
            <div>
                <strong>${book.title}</strong> by ${book.author} 
                - ${((book.pagesRead / book.pages) * 100).toFixed(2)}% read
            </div>
            <button onclick="deleteBook('${book._id}')" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        `;
        booksList.appendChild(li);
    });

    totalReadEl.textContent = totalRead;
    totalPagesEl.textContent = totalPages;
}

// Delete book
async function deleteBook(id) {
    await fetch(`/books/${id}`, { method: 'DELETE' });
    fetchBooks();
}

// Handle form submit
form.addEventListener('submit', async e => {
    e.preventDefault();

    const newBook = {
        title: form.title.value,
        author: form.author.value,
        pages: Number(form.pages.value),
        status: form.status.value,
        price: Number(form.price.value),
        pagesRead: Number(form.pagesRead.value),
        format: form.format.value,
        suggestedBy: form.suggestedBy.value
    };

    await fetch('/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook)
    });

    form.reset();
    fetchBooks();
});

fetchBooks();
