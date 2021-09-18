const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const { Advertisement, User, Comment } = require("../models");

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

    let rawComments = await Comment.findAll({
      include: [User]
    });
    let comments = rawComments.map(c => c.toJSON());

    res.render("ads/show", { ad: cleanAd, comments });
  } catch (error) {
    console.log(error);
    res.render("404");
  }
});

router.post('/comments', isLoggedIn, async (req, res) => {
  try {
    let newComment = await Comment.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.user.id
    })
    let comment = newComment.toJSON();
    console.log('NEW COMMENT AT 1:18AM', comment);
    res.redirect(`/ads/${req.body.adId}`);
  } catch (error) {
    console.log(error);
    res.redirect(`/ads/${req.body.adId}`);
  }
})

module.exports = router;
