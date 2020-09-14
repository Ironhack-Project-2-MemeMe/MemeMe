const express = require("express");
const router = express.Router();
const { uploader, cloudinary } = require("../config/cloudinary.config.js");
const Meme = require("../models/Meme.js");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/meme/add", (req, res, next) => {
  res.render("meme-add");
});
router.post("meme/add", uploader.single("image"), (req, res, next) => {
  const { title, description } = req.body;

  const imgName = req.file.originalname;
  const imgPath = req.file.url;
  const imgPublicId = req.file.public_id;

  Meme.create({ title, description, imgName, imgPath, imgPublicId })
    .then((meme) => {
      res.redirect("/");
    })
    .catch((err) => {
      next(err);
    });
});
module.exports = router;
