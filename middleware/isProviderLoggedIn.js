function isProviderLoggedIn(req, res, next) {
  if (!req.provider) {
    req.flash("error", "You must be signed in to access page");
    res.redirect("/provider/login");
  } else {
    next();
  }
}

module.exports = isProviderLoggedIn;
