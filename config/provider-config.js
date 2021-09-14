const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Provider } = require("../models");

const PROVIDER_STRATEGY = new LocalStrategy(
  {
    usernameField: "email", // looks for an email field as the username
    passwordField: "password", // looks for an password field as the password
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

passport.use(PROVIDER_STRATEGY);
module.exports = passport;
