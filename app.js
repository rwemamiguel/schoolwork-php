require("dotenv").config();
const express = require('express');
const session = require('express-session');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const localStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const path = require('path');
const passportConfig = require('./config/passport');
passportConfig(passport);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(cookieParser());
app
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.redirect('/login');
});


app.get('/', (req,res)=>res.sendFile(path.join(__dirname,'views/login.html')));
app.get('/dashboard',(req,res)=>res.sendFile(path.join(__dirname,'views/dashboard.html')));
app.get('/products',(req,res)=>res.sendFile(path.join(__dirname,'views/products.html')));
app.get('/suppliers',(req,res)=>res.sendFile(path.join(__dirname,'views/suppliers.html')));
app.get('/stock',(req,res)=>res.sendFile(path.join(__dirname,'views/stock.html')));

app.use('/', require('./routes/userRoutes'));
app.use('/products', require('./routes/productRoutes'));
app.use('/suppliers', require('./routes/supplierRoutes'));
//app.use('/transactions', require('./routes/transactionRoutes'));

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

module.exports = app;
