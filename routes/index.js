const express = require("express");
const router = express.Router();
const { loggedInMaybe } = require('./middleware');
const Meme = require("../models/Meme.js");
const { selectRandomPics } = require("./helper");

/* GET home page */
router.get("/", loggedInMaybe, (req, res, next) => {
  Meme.find()
    .then((memes) => {
        if(req.mememeIsUserLoggedIn) {
          res.render("index", { imgList: selectRandomPics(memes, 10), isLoggedIn: req.mememeIsUserLoggedIn, username: req.mememeUser.username });
        } else {
          res.render("index", { imgList: selectRandomPics(memes, 10), isLoggedIn: req.mememeIsUserLoggedIn });
        }
    })
    .catch((error) => {
      console.log("error is happening while getting the memes data", error);
    });
});


module.exports = router;