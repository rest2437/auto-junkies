function isProviderLoggedIn(req, res, next) {
  if (!req.provider) {
    req.flash("error", "You must be signed in to access page");
    res.redirect("/auth/providerlogin");
  } else if (req.user.role === "provider") {
    console.log("Provider now logged in");
    next();
  }
}

module.exports = isProviderLoggedIn;
