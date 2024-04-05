const passportGuest = (req, res, next) => {
  if (req.user) {
    // if user is logged in then user is redirect to home page
    res.redirect("/");
    return;
  }
  // else next func will call
  next();
};

module.exports = passportGuest;
