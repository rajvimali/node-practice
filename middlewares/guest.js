const guest = (req, res, next) => {
  if (req.cookies.user) {
    // if user is logged in then user is redirect to home page
    res.redirect("/");
    return;
  }
  // else next func will call
  next();
};

module.exports = guest;
