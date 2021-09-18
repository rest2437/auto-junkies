const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const { Advertisement, User } = require("../models");

router.get("/", isLoggedIn, async (req, res) => {
  try {
    let rawAds = await Advertisement.findAll({
      include: [User],
    });
    let ads = rawAds.map((a) => a.toJSON());

    console.log(ads);

    res.render("ads/index", { advertisements: ads });
  } catch (error) {
    console.log(error);
    res.render("404");
  }
});



router.get("/new", isLoggedIn, async (req, res) => {
  res.render("ads/new");
});

router.post("/new", isLoggedIn, async (req, res) => {
  try {
    let newAd = await Advertisement.create({
      title: req.body.title,
      subtitle: req.body.subtitle,
      content: req.body.content,
      userId: req.user.id,
    });
    let ad = newAd.toJSON();
    console.log(ad);
    res.redirect("/ads");
  } catch (error) {
    console.log(error);
    res.redirect("/ads/new");
  }
});

router.get("/:idx", isLoggedIn, async (req, res) => {
  try {
    let rawAd = await Advertisement.findOne({
      where: { id: req.params.idx },
      include: [User],
    });
    let cleanAd = rawAd.toJSON();

    console.log(cleanAd);

    res.render("ads/show", { ad: cleanAd });
  } catch (error) {
    console.log(error);
    res.render("404");
  }
});

module.exports = router;
