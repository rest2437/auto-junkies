const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const { Advertisement } = require('../models');

router.get('/', isLoggedIn, async (req, res) => {
    try {
        let rawAds = await Advertisement.findAll({
            include:[User]
        });
        let ads = rawAds.map(a => a.toJSON());
    
        res.render('ads/index', { advertisements: ads });
    } catch (error) {
        console.log(error);
        res.render('404');
    }
    
});

router.get("/new", isLoggedIn, async (req, res) => {
    res.render("ads/new");
});

router.post('/new', async (req, res) => {
    console.log('POST AD', req.body);
});

module.exports = router;
