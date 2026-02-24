// require("dotenv").config();
// const express = require('express');
// const session = require('express-session');
// const cookieParser = require("cookie-parser");
// const passport = require('passport');
// const path = require('path');
// const passportConfig = require('./config/passport');
// passportConfig(passport);

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));


// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }));

// app.use(cookieParser());
// app.use(passport.initialize());
// app.use(passport.session());

// app.get('/', (req, res) => {
//     res.redirect('/login');
// });

// app.use('/', require('./routes/userRoutes'));
// app.use('/products', require('./routes/productRoutes'));
// app.use('/suppliers', require('./routes/supplierRoutes'));
// app.use('/api/dashboard', require('./routes/dashboardRoutes'));
// //app.use('/transactions', require('./routes/transactionRoutes'));

// module.exports = app;



require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const cookieParser = require("cookie-parser");
const dashboardRoutes = require('./routes/dashboardRoutes');
const authRoutes = require('./routes/authRoutes');
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: "inventorySecretKey",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("views"));
app.use("/", authRoutes);
app.use("/", require("./routes/authRoutes"));
app.use("/dashboard", require("./routes/dashboardRoutes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/suppliers", require("./routes/supplierRoutes"));
app.use("/stock", require("./routes/userRoutes"));
app.use('/', dashboardRoutes);
module.exports = app;