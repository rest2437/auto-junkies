const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const LocalStrategy2 = require("passport-local").Strategy;

// Database
//=======================================USER=============================================
const { User } = require("../models");

const STRATEGY = new LocalStrategy(
  {
    usernameField: "email", // looks for an email field as the username
    passwordField: "password", // looks for an password field as the password
  },
  async (email, password, cb) => {
    //cb stabnds for call back
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
passport.use(STRATEGY);

//==========================================PROVIDER=============================
const { Provider } = require("../models");

const STRATEGY2 = new LocalStrategy2(
  {
    providernameField: "providerEmail", // looks for an email field as the username
    providerpasswordField: "providerPassword", // looks for an password field as the password
  },
  async (email, password, cb) => {
    //cb stabnds for call back
    try {
      const provider = await Provider.findOne({
        where: { email },
      });

      if (!provider || !provider.validPassword(password)) {
        cb(null, false); // if no user or invalid password, return false
      } else {
        cb(null, provider);
      }
    } catch (err) {
      console.log("------- Error below -----------");
      console.log(err);
    }
  }
);
// Passport "serialize" info to be able to login
passport.serializeUser((provider, cb) => {
  cb(null, provider.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const provider = await Provider.findByPk(id);

    if (provider) {
      cb(null, provider);
    }
  } catch (err) {
    console.log("---- Yo... There is an error ----");
    console.log(err);
  }
});

passport.use(STRATEGY2);
module.exports = passport;
