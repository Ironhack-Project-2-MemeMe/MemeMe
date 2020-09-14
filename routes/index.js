const express = require("express");
const router = express.Router();
const { fileUploader, cloudinary } = require("../config/cloudinary.config.js");
const Meme = require("../models/Meme.js");

/* GET home page */
router.get("/", (req, res, next) => {
  Meme.find()
    .then((memes) => {
      console.log("memes==================>",  memes );
      res.render("index", { imgList: memes });
    })
    .catch((error) => {
      console.log("error is happening while getting the memes data", error);
    });
});

router.get("/meme/add", (req, res, next) => {
  res.render("meme-add");
});
router.post("/meme/add", fileUploader.single("image"), (req, res, next) => {
  const { title, description,imageUrl } = req.body;

  const imgName = req.file? req.file.originalname :title ;
  const imgPath = req.file ? req.file.url : req.body.imageUrl;
  const imgPublicId = req.file ?req.file.public_id :"1" ;

  Meme.create({ title, description, imgName, imgPath, imgPublicId })
    .then((meme) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log("error =====>", err);
      next(err);
    });
});
module.exports = router;
