const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema({
  title: { type: String, required: true },
  creator: { type: String, required: true },
  audio: {type: String, required: true},
  genre: {type: String, required: true},
  intrument: {type: String, required: true},
  download: {type: Number, default: 0},
  likes: {type: Array, default: []},
  date: { type: Date, default: Date.now }
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
