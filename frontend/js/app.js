let allBooks = [];

// BACKEND URL
const BASE_URL = "https://library-management-1-kkbz.onrender.com";

// ---------- PAGE TOGGLE ----------
function showLogin() {
    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('mainPage').style.display = 'none';
}

function showHome() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainPage').style.display = 'block';
}

// ---------- LOGIN ----------
function login() {

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin123') {

        showHome();

    } else {

        alert('Invalid Credentials');
    }
}

// ---------- FETCH BOOKS ----------
async function fetchBooks() {

    try {

        const response = await fetch(`${BASE_URL}/books`);

        const books = await response.json();

        allBooks = books;

        updateDashboard(books);

        displayBooks(books);

    } catch (error) {

        console.log(error);
    }
}

// ---------- DISPLAY BOOKS ----------
function displayBooks(books) {

    const bookList = document.getElementById('bookList');

    bookList.innerHTML = '';

    books.forEach(book => {

        const div = document.createElement('div');

        div.classList.add('book');

        div.innerHTML = `
            <h2>${book.title}</h2>

            <p>Author: ${book.author}</p>

            <img src="${book.image}" width="120">

            <p>
                Status:
                ${book.borrowed ? 'Borrowed' : 'Available'}
            </p>

            <button onclick="borrowBook('${book._id}')">
                Borrow
            </button>

            <button onclick="returnBook('${book._id}')">
                Return
            </button>

            <button onclick="deleteBook('${book._id}')">
                Delete
            </button>
        `;

        bookList.appendChild(div);
    });
}

// ---------- ADD BOOK ----------
document.getElementById('bookForm').addEventListener('submit', async (e) => {

    e.preventDefault();

    const title = document.getElementById('title').value;

    const author = document.getElementById('author').value;

    const image = document.getElementById('image').value;

    try {

        await fetch(`${BASE_URL}/books`, {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                title,
                author,
                image
            })
        });

        document.getElementById('bookForm').reset();

        fetchBooks();

    } catch (error) {

        console.log(error);
    }
});

// ---------- SEARCH ----------
document.getElementById('searchInput').addEventListener('keyup', () => {

    const searchText =
        document.getElementById('searchInput').value.toLowerCase();

    const filteredBooks = allBooks.filter(book =>
        book.title.toLowerCase().includes(searchText)
    );

    displayBooks(filteredBooks);
});

// ---------- BORROW ----------
async function borrowBook(id) {

    await fetch(`${BASE_URL}/books/borrow/${id}`, {
        method: 'PUT'
    });

    fetchBooks();
}

// ---------- RETURN ----------
async function returnBook(id) {

    await fetch(`${BASE_URL}/books/return/${id}`, {
        method: 'PUT'
    });

    fetchBooks();
}

// ---------- DELETE ----------
async function deleteBook(id) {

    await fetch(`${BASE_URL}/books/${id}`, {
        method: 'DELETE'
    });

    fetchBooks();
}

// ---------- DASHBOARD ----------
function updateDashboard(books) {

    const totalBooks = books.length;

    const borrowedBooks =
        books.filter(book => book.borrowed).length;

    const availableBooks =
        totalBooks - borrowedBooks;

    document.getElementById('totalBooks').innerText =
        totalBooks;

    document.getElementById('borrowedBooks').innerText =
        borrowedBooks;

    document.getElementById('availableBooks').innerText =
        availableBooks;
}

// ---------- INITIAL LOAD ----------
fetchBooks();
