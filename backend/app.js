const http = require('http');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const bodyparser = require('body-parser');
const multer = require('multer');

const DIR = './notes/';
const fileStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, DIR)
    },
    filename: (req,file,cb) => {
        cb(null, file.originalname + '-' + Date.now())
    }
})

const fileFilter = (req,file,cb) => {
    const allowable_mimetype  = 'application/pdf';
    if(allowable_mimetype.toString() === file.mimetype.toString()) {
        cb(null, true);
    } else {
        cb(null,false);
    }
}

// Routes
app.use('/notes', express.static(path.join(__dirname, 'notes')));
app.use(bodyparser.json());
app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
}).fields([{name: 'file', maxCount: 1}, {name: 'profile_image', maxCount: 1}]));

const noteRoutes = require('./routes/notes');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next(); 
})

app.use('/auth', authRoutes);
app.use('/notes', noteRoutes);
app.use('/user', userRoutes);


const MONGODB_DB_KEY = 'mongodb+srv://kavvya_rr:QSyf9MvauGh1EjW3@cluster0-rokrd.mongodb.net/Notes?retryWrites=true&w=majority';

app.use((err,req,res,next) => {
    res.status(err.status).json({
        message: err.message || 'An Error Occurred! Please try again.',
        status: err.status ? err.status : 500
    })
});


mongoose.connect(MONGODB_DB_KEY)
.then(result => {
    console.log('connection to DB successful');
    app.listen(8080);
})
.catch(err => {
    console.log(err);
})


