//=================================IMPORTS=======================================

const express = require("express");
const router = express.Router();
const passport = require("../config/ppConfig");
const { User } = require("../models");
const generateProviderId = require("../utils/utils");
//=================================GET ROUTS=======================================

router.get("/p-home", (req, res) => {
  res.render("auth/p-home");
});

router.get("/u-home", (req, res) => {
  res.render("auth/u-home");
});

router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success", "Logging out... See you next time!");
  res.redirect("/");
});

//==================================POST ROUTS=====================================

router.post(
  "/providerLogin",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/p-home",
    successFlash: "Welcome back ...",
    failureFlash: "Either email or password is incorrect",
  })
);
router.post(
  "/userLogin",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/u-home",
    successFlash: "Welcome back ...",
    failureFlash: "Either email or password is incorrect",
  })
);

router.post("/userSignup", async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, password },
    });

    if (created) {
      console.log(`----- ${user.name} was created -----`);
      const successObject = {
        successRedirect: "/",
        successFlash: `Welcome ${user.name}. Account was created and logging in...`,
      };
      //
      passport.authenticate("local", successObject)(req, res);
    } else {
      req.flash("error", "Email already exists");
      res.redirect("/auth/u-home");
    }
  } catch (error) {
    console.log("**************Error");
    console.log(error);
    req.flash(
      "error",
      "Either email or password is incorrect. Please try again."
    );
    res.redirect("/auth/u-home");
  }
});

router.post("/providerSignup", async (req, res) => {
  const { email, name, password } = req.body;
  let id = generateProviderId();
  console.log(id);
  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, password, providerNumber: id, provider: true },
    });

    if (created) {
      console.log(`----- ${user.name} was created -----`);
      const successObject = {
        successRedirect: "/",
        successFlash: `Welcome ${user.name}. Account was created and logging in...`,
      };
      //
      passport.authenticate("local", successObject)(req, res);
    } else {
      req.flash("error", "Email already exists");
      res.redirect("/auth/p-home");
    }
  } catch (error) {
    console.log("**************Error");
    console.log(error);
    req.flash(
      "error",
      "Either email or password is incorrect. Please try again."
    );
    res.redirect("/auth/p-home");
  }
});

router.put("/edit/:idx", async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let id = req.params.idx;
  try {
    if (name && email) {
      let numberOfUsersUpdated = await User.update(
        { name, email },
        {
          where: { id },
        }
      );
      res.redirect("/profile");
    } else if (name) {
      let numberOfUsersUpdated = await User.update(
        { name },
        {
          where: { id },
        }
      );

      res.redirect("/profile");
    } else if (email) {
      let numberOfUsersUpdated = await User.update(
        { email },
        {
          where: { id },
        }
      );

      res.redirect("/profile");
    }
  } catch (error) {
    res.render("404");
    console.log(error);
  }
});

module.exports = router;
