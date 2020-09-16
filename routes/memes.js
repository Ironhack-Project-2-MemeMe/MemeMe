const express = require("express");
const router = express.Router();
const { loggedInOnly } = require('./middleware');
const { fileUploader, cloudinary } = require("../config/cloudinary.config.js");
const Meme = require("../models/Meme.js");
const User = require('../models/User');
// const { loggedInOnly } = require('./middleware');

router.get("/meme", (req, res) => { 
  Meme.find().then((memefromDb) => {
    res.render("meme", { memes: memefromDb });
  });
});

router.get("/meme/add", loggedInOnly, (req, res, next) => {
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

router.get("/meme/random/:numberOfMemes", (req, res) => {
  const numberOfMemes = parseInt(req.params.numberOfMemes);
  Meme.find()
    .limit(numberOfMemes)
    .then((memesfromDb) => {
      for (const memefromDb of memesfromDb) {
        console.log("memefromDb ====================>",memefromDb)
      }
     
      res.render('meme', {memes: memesfromDb});
    });
});


router.post("/meme", (req, res) => {
  const { title, description, imageUrl } = req.body;
  Meme.create({ title, description, imgName, imgPath, imgPublicId })
  .then((meme) => {
    res.redirect(`/meme/${meme._id}`);
  })
  .catch((err) => {
    next(err);
  });
});
 

router.post("/meme/add", loggedInOnly, fileUploader.single("image"), (req, res, next) => {
  const { title, description, imageUrl } = req.body;

  const imgName = req.file ? req.file.originalname : title;
  const imgPath = req.file ? req.file.url : req.body.imageUrl;
  const imgPublicId = req.file ? req.file.public_id : "1";
  const userId = req.mememeUser._id;

  Meme.create({ user: userId, title, description, imgName, imgPath, imgPublicId })
    .then((meme) => {
      res.redirect("/");
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/meme/:memeId/delete", loggedInOnly, (req, res, next) => {
  const id = req.params.memeId;
  Meme.findById(id).then((meme) => {
    if(meme.user.equals(req.mememeUser._id)) {
      console.log('User ', req.mememeUser._id, ' deleting meme ', meme._id);
      Meme.findByIdAndDelete(id)
      .then(() => {
        res.redirect("/profile");
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
    } else {
      console.log('User ', req.mememeUser._id, ' trying to delete unowned meme ', meme._id, ' owned by ', meme.user);
      res.redirect("/profile");
    }
  }).catch((err)=>{
    console.log(err);
    next(err);
  });
});




 
router.post("/meme/:memeId/reviews", loggedInOnly, (req, res, next) => {
  const { user, comments } = req.body;
  Meme.findByIdAndUpdate(
    { _id: req.params.memeId },
    {
      $push: {
        reviews: {
          user: user,
          comments: comments,
        },
      },
    }
  )
    .then((meme) => {

      res.redirect(`/meme/${meme._id}`);
    })
    .catch((error) => {
      next(error);
    });
});

 

module.exports = router;
