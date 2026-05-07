const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  date: Date
});

module.exports = mongoose.model("Event", eventSchema);