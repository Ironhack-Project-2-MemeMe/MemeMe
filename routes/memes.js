const express = require("express");
const router = express.Router();
const { fileUploader, cloudinary } = require("../config/cloudinary.config.js");
const Meme = require("../models/Meme.js");
const User = require('../models/User')


router.get("/meme", (req, res) => { 
  Meme.find().then((memefromDb) => {
    res.render("meme", { memes: memefromDb });
  });
});

router.get("/meme/add", (req, res, next) => {
  res.render("meme-add");
});

router.get("/meme/:memeId", (req, res) => {
  const id = req.params.memeId;
  Meme.findById(id)
    .populate("user")
    .then((memefromDb) => {
     
      res.render('meme', {memes: memefromDb});
    });
});


router.post("/meme", (req, res) => {
  const { title, description, imageUrl } = req.body;
  Meme.create({ title, description, imgName, imgPath, imgPublicId })
  .then((meme) => {
    res.redirect(`/meme/${meme._id}`);;
  })
  .catch((err) => {
    next(err);
  });
});
 

router.post("/meme/add", fileUploader.single("image"), (req, res, next) => {
  const { title, description, imageUrl } = req.body;

  const imgName = req.file ? req.file.originalname : title;
  const imgPath = req.file ? req.file.url : req.body.imageUrl;
  const imgPublicId = req.file ? req.file.public_id : "1";

  Meme.create({ title, description, imgName, imgPath, imgPublicId })
    .then((meme) => {
      res.redirect("/");
    })
    .catch((err) => {
      next(err);
    });
});


module.exports = router;
