const express = require("express");
const session = require("express-session");
const db=require("./config/db");
const dashboardRoutes = require("./routes/dashboardRoutes");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const app = express();

// // Body parser
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(cookieParser());

// // Serve static HTML
// app.use(express.static(path.join(__dirname, "public")));

// // Session
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     httpOnly: true,
//     maxAge: 1000 * 60 * 60
//   }
// }));

// // Passport
// require("./config/passport")(passport);
// app.use(passport.initialize());
// app.use(passport.session());

// // Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/dashboard", dashboardRoutes);
app.use("/products", require("./routes/productRoutes"));
app.use("/suppliers", require("./routes/supplierRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});









