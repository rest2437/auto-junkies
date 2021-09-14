require("dotenv").config();
const express = require("express");
const userRouter = express.Router();
const passport = require("../config/ppConfig");
const isUserLoggedIn = require("../middleware/isUserLoggedIn");
// const session = require("express-session");
// const flash = require("connect-flash");
// const methodOverride = require("method-override");

// userRouter.use(require("morgan")("dev"));
// userRouter.use(express.urlencoded({ extended: false }));
// userRouter.use(methodOverride("_method"));
// userRouter.use(express.json());
// userRouter.use(express.static(__dirname + "/public"));
// userRouter.use(layouts);

const { User } = require("../models");

// const SECRET_SESSION = process.env.SECRET_SESSION;
// const sessionObject = {
//   secret: SECRET_SESSION,
//   resave: false,
//   saveUninitialized: true,
// };

// userRouter.use(session(sessionObject));
// userRouter.use(passport.initialize());
// userRouter.use(passport.session());
// userRouter.use(flash());
// userRouter.use((req, res, next) => {
//   res.locals.success_msg = req.flash("success_msg");
//   res.locals.error_msg = req.flash("error_msg");
//   res.locals.error = req.flash("error");
//   res.locals.currentUser = req.user;
//   next();
// });
userRouter.get("/signup", (req, res) => {
  res.render("user/signup"); // this is a form
});

userRouter.get("/login", (req, res) => {
  res.render("user/login");
});

userRouter.get("/profile", isUserLoggedIn, (req, res) => {
  if (req.user.get()) {
    const { id, name, email } = req.user.get();
    res.render("provider/profile", { id, name, email });
  }
});

userRouter.get("/logout", (req, res) => {
  req.logOut(); // logs the user out of the session
  req.flash("success", "Logging out... See you next time!");
  res.redirect("/");
});
// userRouter.get("/userProfile", isUserLoggedIn, (req, res) => {
//   res.render("auth/userProfile"); // this is a form
// });

userRouter.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  User.findOrCreate({
    where: { email },
    defaults: { name, password },
  })
    .then(([user, created]) => {
      if (created) {
        console.log(`${user.name} was created....`);
        const successObject = {
          successRedirect: `/user/profile`,
          successFlash: `Welcome ${user.name}. Account was created and logging in...`,
        };
        passport.authenticate("user-local", successObject)(req, res);
      } else {
        // Send back email already exists
        req.flash("error", "Email already exists");
        res.redirect("/signup");
      }
    })
    .catch((error) => {
      console.log("**************Error");
      console.log(error);
      req.flash(
        "error",
        "Either email or password is incorrect. Please try again."
      );
      res.redirect("/user/signup");
    });
});

userRouter.post(
  "/login",
  passport.authenticate("user-local", {
    successRedirect: "/",
    failureRedirect: "/user/login",
    successFlash: "Welcome back ...",
    failureFlash: true,
  })
);

module.exports = userRouter;
