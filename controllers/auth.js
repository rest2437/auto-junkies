//=================================IMPORTS=======================================
const express = require("express");
const router = express.Router();
const passport = require("../config/ppConfig");
const { User } = require("../models");
const { Provider } = require("../models");

//=================================User =======================================

// router.get("/signup", (req, res) => {
//   res.render("auth/signup");
// });
// router.get("/login", (req, res) => {
//   res.render("auth/login");
// });
// router.get("/userProfile", (req, res) => {
//   res.render("auth/userProfile");
// });
//=================================Provider=======================================
// router.get("/providerSignup", (req, res) => {
//   res.render("auth/providerSignup");
// });

// router.get("/providerlogin", (req, res) => {
//   res.render("auth/providerlogin");
// });

// isLoggedIn middleware
// router.get("/providerProfile", (req, res) => {
//   res.render("auth/providerProfile");
// });
//=================================GET ROUTS=======================================

// router.get("/logout", (req, res) => {
//   req.logOut();
//   req.flash("success", "Logging out... See you next time!");
//   res.redirect("/");
// });
//=======test==========

//==================================POST ROUTS=====================================
// router.post(
//   "/login",
//   passport.authenticate("user-local", {
//     successRedirect: "/auth/userProfile",
//     failureRedirect: "/auth/login",
//     successFlash: "Welcome back ...",
//     failureFlash: "Either email or password is incorrect",
//   })
// );

// router.post(
//   "/providerlogin",
//   passport.authenticate("provider-local", {
//     successRedirect: "/auth/providerProfile",
//     failureRedirect: "/auth/providerlogin",
//     successFlash: "Welcome back ...",
//     failureFlash: "Either email or password is incorrect",
//   })
// );

//===================================USER==========================================
// router.post("/signup", async (req, res) => {
//   const { email, name, password } = req.body;
//   try {
//     const [user, created] = await User.findOrCreate({
//       where: { email },
//       defaults: { name, password },
//     });

//     if (created) {
//       console.log(`----- ${user.name} was created -----`);
//       const successObject = {
//         successRedirect: "/",
//         successFlash: `Welcome ${user.name}. Account was created and logging in...`,
//       };
//       passport.authenticate("local", successObject)(req, res);
//     } else {
//       req.flash("error", "Email already exists");
//       res.redirect("/auth/signup");
//     }
//   } catch (error) {
//     console.log("**************Error");
//     console.log(error);
//     req.flash(
//       "error",
//       "Either email or password is incorrect. Please try again."
//     );
//     res.redirect("/auth/signup");
//   }
// });

//========================================PROVIDER===============================================
// router.post("/providerSignup", async (req, res) => {
//   const { email, name, password } = req.body;
//   try {
//     const [provider, created] = await Provider.findOrCreate({
//       where: { email },
//       defaults: { name, password },
//     });

//     if (created) {
//       console.log(`----- ${provider.name} was created -----`);
//       const successObject = {
//         successRedirect: "/",
//         successFlash: `Welcome ${provider.name}. Account was created and logging in...`,
//       };
//       passport.authenticate("local", successObject)(req, res);
//     } else {
//       req.flash("error", "Email already exists");
//       res.redirect("/auth/providerSignup");
//     }
//   } catch (error) {
//     console.log("**************Error");
//     console.log(error);
//     req.flash(
//       "error",
//       "Either email or password is incorrect. Please try again."
//     );
//     res.redirect("/auth/providerSignup");
//   }
// });

module.exports = router;
