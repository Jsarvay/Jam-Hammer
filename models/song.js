const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema({
  title: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  audio: { type: String, required: true },
  genre: { type: String, required: true },
  instrument: { type: String, required: true },
  description: { type: String },
  download: { type: Number, default: 0 },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  date: { type: Date, default: Date.now }
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
