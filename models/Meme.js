const express = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const memeSchema = new Schema({
  title: String,
  description: String,
  user: {
    required: [true, 'User is required.'],
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      user: String,
      comments: String
    }
  ],
  rating: Number,
  imgName: String,
  imgPath: String,
  imgPublicId: String,
});
const Meme = mongoose.model("Meme", memeSchema);
module.exports = Meme;
