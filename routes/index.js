const express = require("express");
const router = express.Router();
const { loggedInMaybe } = require('./middleware');
const Meme = require("../models/Meme.js");


/* GET home page */
router.get("/", loggedInMaybe, (req, res, next) => {
  Meme.find()
    .then((memes) => {
        if(req.mememeIsUserLoggedIn) {
          res.render("index", { imgList: memes, isLoggedIn: req.mememeIsUserLoggedIn, username: req.mememeUser.username });
        } else {
          res.render("index", { imgList: memes, isLoggedIn: req.mememeIsUserLoggedIn });
        }
    })
    .catch((error) => {
      console.log("error is happening while getting the memes data", error);
    });
});


module.exports = router;