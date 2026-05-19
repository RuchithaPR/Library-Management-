const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

mongoose.connect('mongodb://ruchitha:ruchitha123@ac-dqbimx1-shard-00-00.wd8e7jl.mongodb.net:27017,ac-dqbimx1-shard-00-01.wd8e7jl.mongodb.net:27017,ac-dqbimx1-shard-00-02.wd8e7jl.mongodb.net:27017/libraryDB?ssl=true&replicaSet=atlas-8uzk9r-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('MongoDB Connected');
})
.catch((err)=>{
    console.log(err);
});

app.use(express.json());

app.use(express.static(path.join(__dirname,'../frontend')));

const bookRoutes = require('./routes/bookRoutes');

app.use(bookRoutes);

app.get('/', (req,res)=>{

    res.sendFile(path.join(__dirname,'../frontend/index.html'));
});

const PORT = 3000;

app.listen(PORT, ()=>{

    console.log(`Server running on port ${PORT}`);
});