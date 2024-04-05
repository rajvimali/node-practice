// import express from 'express'
const express = require("express");
const router = require("./routes/routes");
const db = require("./config/db");
const userModel = require("./models/userModel");
const cookieParser = require("cookie-parser");
const { productRouter } = require("./routes/productRoutes");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const app = express(); // initialize express
const PORT = 3000; // define port number

// database connection
db();

// setting
app.set("view engine", "ejs");

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true },
  })
);

// passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await userModel.findOne({
        email: username,
        password: password,
      });
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      done(error);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  done(null, id);
});

// routes
app.use(router);
app.use("/product", productRouter);

// static folder server
app.use(express.static("uploads"));

// listen server
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

// for learning purpose
// const body = {
//   name: "rajvi",
//   email: "rajvi123@gmail.com",
// };

// finding in database using (find and findOne)
// userModel
//   .find()
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

//  delete in db (deleteOne , deleteMany,findOneAndDelete , findByIdAndDelete)
// userModel
//   .deleteOne({ name: body.name })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
