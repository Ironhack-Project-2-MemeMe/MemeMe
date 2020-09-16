const mongoose = require("mongoose");
const Meme = require('../models/Meme');
const User = require('../models/User');

mongoose.connect('mongodb://localhost/mememe', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
  console.log('mongo connected');
})
.catch(error=>{
  console.log('error', error);
});

const memems = [{
title: 'Dog-Meme',
description: 'this is a cute dog',
user: {
  username: 'username',
  password: 'password',
  role: 'user'
},
imgName:'dog',
imgPath: 'https://res.cloudinary.com/dhmv8utor/image/upload/v1600081644/download_gkmwj6.jpg'
}];

memems.forEach(meme=>{
User.create(meme.user).then(dbUser=>{
meme.user =dbUser._id;
Meme.create(meme);
});
});
 