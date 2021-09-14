require("dotenv").config();
const express = require("express");
const layouts = require("express-ejs-layouts");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("./config/ppConfig");
const isProviderLoggedIn = require("./middleware/isProviderLoggedIn");
const isUserLoggedIn = require("./middleware/isUserLoggedIn");

const SECRET_SESSION = process.env.SECRET_SESSION;

app.set("view engine", "ejs");

app.use(require("morgan")("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(layouts);
app.use(
  session({
    secret: SECRET_SESSION, // What we actually will be giving the user on our site as a session cookie
    resave: false, // Save the session even if it's modified, make this false
    saveUninitialized: true, // If we have a new session, we save it, therefore making that true
  })
);

app.use(flash()); // flash middleware

app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Add a session

app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user || undefined;
  res.locals.currentProvider = req.provider || undefined;
  next();
});

app.get("/", (req, res) => {
  res.render("index");
});

//controllers
// app.use("/auth", require("./controllers/auth"));
app.use("/provider", require("./controllers/provider"));
app.use("/user", require("./controllers/user"));

app.get("*", (req, res) => {
  res.render("404");
});

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
