const express = require('express');
const router = express.Router();
const { loggedInOnly } = require('./middleware');
const Meme = require("../models/Meme.js");

router.get('/profile', loggedInOnly, (req, res, next) => {
    const {_id, username, email, role } = req.mememeUser;

    Meme.find({user: _id})
    .then((memes) => {
        res.render('profile', {id: _id, username, email, role, myMemes: memes});
    })
    .catch((error) => {
      console.log("error is happening while getting the memes data", error);
      next(error);
    });
});

module.exports = router;