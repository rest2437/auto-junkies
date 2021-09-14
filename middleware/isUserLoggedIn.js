function isUserLoggedIn(req, res, next) {
  if (!req.user) {
    req.flash("error", "You must be signed in to access page");
    res.redirect("/auth/login");
  } else {
    next();
  }
}
module.exports = isUserLoggedIn;
