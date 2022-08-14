// app.js

const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

// routes
const books = require('./routes/api/book');

const app = express();

// Connect Database
connectDB();
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname+'/../client/build'));
    app.get('*', (req, res) => {
        res.sendFile(__dirname+'/../client/build/index.html')
    });
}
else{
    app.get('/', (req, res) => res.send('Hello world!'));
}

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

//app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/books', books);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));