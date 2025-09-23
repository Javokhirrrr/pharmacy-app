const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  shelf: String,   // pol
  row: String,     // qator
  position: String // joy
}, { timestamps: true });

module.exports = mongoose.model("Location", LocationSchema);
