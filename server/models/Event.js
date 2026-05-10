const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  date: Date,
  category: String,

  status: {
    type: String,
    default: "Upcoming",
  },
  image: String,
});

module.exports = mongoose.model("Event", eventSchema);