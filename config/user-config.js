const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { User } = require("../models");

const USER_STRATEGY = new LocalStrategy(
  {
    usernameField: "email", // looks for an email field as the username
    passwordField: "password", // looks for an password field as the password
  },
  async (email, password, cb) => {
    //cb stands for call back
    try {
      const user = await User.findOne({
        where: { email },
      });

      if (!user || !user.validPassword(password)) {
        cb(null, false); // if no user or invalid password, return false
      } else {
        cb(null, user);
      }
    } catch (err) {
      console.log("------- Error below -----------");
      console.log(err);
    }
  }
);
// Passport "serialize" info to be able to login
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findByPk(id);

    if (user) {
      cb(null, user);
    }
  } catch (err) {
    console.log("---- Yo... There is an error ----");
    console.log(err);
  }
});
passport.use(USER_STRATEGY);
module.exports = passport;