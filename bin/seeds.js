 
const mongoose = require("mongoose");
const Meme = require('../models/Meme')
const User = require('../models/User')

mongoose.connect('mongodb://localhost/mememe', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
  console.log('mongo connected')
})
.catch(error=>{
  console.log('error', error)
})

const memems = [{
title: '' ,
description: '',
artist= {},
imgPath: ''
}]