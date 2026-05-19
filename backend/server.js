const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

// ---------- MIDDLEWARE ----------
app.use(cors());
app.use(express.json());

// ---------- MONGODB CONNECTION ----------
mongoose.connect('mongodb://ruchitha:ruchitha123@ac-dqbimx1-shard-00-00.wd8e7jl.mongodb.net:27017,ac-dqbimx1-shard-00-01.wd8e7jl.mongodb.net:27017,ac-dqbimx1-shard-00-02.wd8e7jl.mongodb.net:27017/libraryDB?ssl=true&replicaSet=atlas-8uzk9r-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log('MongoDB Error:', err));

// ---------- ROUTES ----------
const bookRoutes = require('./routes/bookRoutes');
app.use(bookRoutes);

// ---------- FRONTEND (optional for local testing) ----------
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ---------- RENDER PORT FIX ----------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
