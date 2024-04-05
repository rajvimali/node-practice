const authenticate = (req, res, next) => {
  if (req.cookies.user) {
    // if user is logged in then next func is called
    next();
    return;
  }
  // else user is redirect to login
  res.redirect("/login");
};

module.exports = authenticate;
