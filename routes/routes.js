const express = require("express");
const userModel = require("../models/userModel");
const authenticate = require("../middlewares/authenticate");
const guest = require("../middlewares/guest");
const passport = require("passport");
const passportAuth = require("../middlewares/passportAuth");
const passportGuest = require("../middlewares/passportGuest");

const router = express.Router();

router.get("/", passportAuth, async (req, res) => {
  try {
    let loggedUser = "";
    if (req.user) {
      loggedUser = await userModel.findById(req.user);
    }
    const users = await userModel.find();
    res.render("pages/index", { users: users, loggedUser });
  } catch (error) {
    console.log(error);
  }
});

router.get("/about", (req, res) => {
  res.send("Hello about....");
});

router.get("/signup", passportGuest, (req, res) => {
  res.render("pages/form", { loggedUser: "" });
});

router.post("/signup", async (req, res) => {
  try {
    const checkUser = await userModel.findOne({ email: req.body.email });
    if (checkUser) {
      res.redirect("/signup");
      return;
    }
    const user = await userModel(req.body);
    await user.save();
  } catch (error) {
    console.log(error);
  }

  res.redirect("/login");
});

router.get("/login", passportGuest, (req, res) => {
  res.render("pages/login", { loggedUser: "" });
});

// custom login
router.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!user) {
      res.redirect("/login");
      return;
    }
    res.cookie("user", user.id, {
      maxAge: 60 * 60 * 1000,
    });
  } catch (error) {
    console.log(error);
  }

  res.redirect("/");
});

// login using passportjs(local strategey)
router.post(
  "/passport/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/",
  })
);

router.get("/logout", (req, res) => {
  // custom logout
  // res.clearCookie("user");
  // res.redirect("/login");

  // passport logout
  req.logout(() => {
    res.redirect("/login");
  });
});

router.get("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
});

router.get("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    res.render("pages/edit", { user });
  } catch (error) {
    console.log(error);
  }
});

router.post("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndUpdate(id, req.body);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
