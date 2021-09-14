require("dotenv").config();
const express = require("express");
const passport = require("../config/provider-config");
const providerRouter = express.Router();
const isProviderLoggedIn = require("../middleware/isProviderLoggedIn");
const layouts = require("express-ejs-layouts");
// const session = require("express-session");
// const layouts = require("express-ejs-layouts");
const flash = require("connect-flash");
// const methodOverride = require("method-override");

// providerRouter.use(require("morgan")("dev"));
// providerRouter.use(express.urlencoded({ extended: false }));
// providerRouter.use(methodOverride("_method"));
// providerRouter.use(express.json());
// providerRouter.use(express.static(__dirname + "/public"));
// providerRouter.use(layouts);

const { Provider } = require("../models");

// const SECRET_SESSION = process.env.SECRET_SESSION;
// const sessionObject = {
//   secret: SECRET_SESSION,
//   resave: false,
//   saveUninitialized: true,
// };

// providerRouter.use(session(sessionObject));
providerRouter.use(layouts);
providerRouter.use(passport.initialize());
providerRouter.use(passport.session());
providerRouter.use((req, res, next) => {
  res.locals.alerts = req.flash();
  res.locals.currentUser = undefined;
  res.locals.currentProvider = req.provider;
  console.log("inside provider controller", res.locals);
  next();
});

// providerRouter.use(flash());
// providerRouter.use((req, res, next) => {
//   res.locals.success_msg = req.flash("success_msg");
//   res.locals.error_msg = req.flash("error_msg");
//   res.locals.error = req.flash("error");
//   res.locals.currentProvider = req.provider;
//   next();
// });

providerRouter.get("/signup", (req, res) => {
  res.render("provider/signup"); // this is a form
});

providerRouter.get("/login", (req, res) => {
  res.render("provider/login");
});

providerRouter.get("/profile", isProviderLoggedIn, (req, res) => {
  if (req.provider.get()) {
    const { id, name, email } = req.provider.get();
    res.render("provider/profile", { id, name, email });
  }
});

providerRouter.get("/logout", (req, res) => {
  req.logOut(); // logs the user out of the session
  req.flash("success", "Logging out... See you next time!");
  res.redirect("/");
});

// providerRouter.get("/profile", isProviderLoggedIn, (req, res) => {
//   res.render("provider/profile"); // this is a form
// });

providerRouter.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  Provider.findOrCreate({
    where: { email },
    defaults: { name, password },
  })
    .then(([provider, created]) => {
      if (created) {
        console.log(`${provider.name} was created....`);
        const successObject = {
          successRedirect: `/provider/profile`,
          successFlash: `Welcome ${provider.name}. Account was created and logging in...`,
        };
        passport.authenticate("provider-local", successObject)(req, res);
      } else {
        // Send back email already exists
        req.flash("error", "Email already exists");
        res.redirect("/provider/signup");
      }
    })
    .catch((error) => {
      console.log("**************Error");
      console.log(error);
      req.flash(
        "error",
        "Either email or password is incorrect. Please try again."
      );
      res.redirect("/provider/signup");
    });
});

providerRouter.post(
  "/login",
  passport.authenticate("provider-local", {
    successRedirect: "/",
    failureRedirect: "/provider/login",
    successFlash: "Welcome back ...",
    failureFlash: true,
  })
);

module.exports = providerRouter;
