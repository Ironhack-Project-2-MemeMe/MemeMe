const express = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const memeSchema = new Schema({
  title: String,
  description: String,
  artist: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  imgName: String,
  imgPath: String,
  imgPublicId: String,
});
const Meme = mongoose.model("Meme", memeSchema);
module.exports = Meme;
