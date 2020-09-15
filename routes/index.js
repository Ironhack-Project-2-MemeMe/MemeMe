const express = require("express");
const router = express.Router();

const Meme = require("../models/Meme.js");

/* GET home page */
router.get("/", (req, res, next) => {
  Meme.find()
    .then((memes) => {
      res.render("index", { imgList: memes });
    })
    .catch((error) => {
      console.log("error is happening while getting the memes data", error);
    });
});

module.exports = router;
