const express = require("express");
const router = express.Router();
const { fileUploader, cloudinary } = require("../config/cloudinary.config.js");
const Meme = require("../models/Meme.js");
const User = require('../models/User')
const { loggedInOnly } = require('./middleware');

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
     
      res.render('meme', {memes: memefromDb});
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



//COMMENTS ==> Daniela
// router.post("/memes/:memeId/comments", (req, res, next) => {
 
//   const { user, comments } = req.body; 
  
//   Meme.update({_id:req.params.memeId}, {
//     $push: {
//       comment: {   
//         user: user,
//         comments: comments,
//       },
//     },
//   })
//     .then((meme) => {
//       res.redirect('/meme');
//     })
//     .catch((error) => {
//       next(error);
//     });
// });

 

module.exports = router;
