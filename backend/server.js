const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

// ---------- MIDDLEWARE ----------
app.use(cors());
app.use(express.json());

// ---------- MONGODB CONNECTION ----------
mongoose.connect('mongodb+srv://ruchitha:ruchitha123@cluster0.wd8e7jl.mongodb.net/libraryDB?retryWrites=true&w=majority')
.then(() => {
    console.log('MongoDB Connected');
})
.catch((err) => {
    console.log('MongoDB Error:', err);
});

// ---------- ROUTES ----------
const bookRoutes = require('./routes/bookRoutes');

app.use(bookRoutes);

// ---------- FRONTEND ----------
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ---------- PORT ----------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);
});
