const express = require("express");
const router = express.Router();
const { loggedInOnly } = require('./middleware');
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
      console.log("memefromDb ====================>",memefromDb)
     
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

// DELETE ==> Diana
router.get("/meme/delete/:memeId", (req, res) => {
  const id = req.params.memeId;
  Meme.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/profile");
    })
    .catch((error) => {
      console.log(error);
    });
});



// COMMENTS ==> Daniela
router.post("/meme/:memeId/reviews", (req, res, next) => {
 
  const { user, comments } = req.body; 

  
  Meme.findByIdAndUpdate({_id:req.params.memeId}, {
    $push: {
      reviews: {   
        user: user,
        comments: comments,
      },
    },
  })
    .then((meme) => {
      console.log("successs==============>",meme)
      res.redirect(`/meme/${meme._id}`);
    })
    .catch((error) => {
      next(error);
    });
});

 

module.exports = router;
