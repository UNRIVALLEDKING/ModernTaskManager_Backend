const mongoose = require("mongoose");

const allProjectsSchema = new mongoose.Schema({
  user: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  desc: {
    required: false,
    type: String,
  },
  deadline: {
    required: false,
    type: Date,
  },
  start: {
    required: false,
    type: Date,
  },
  progress: {
    required: false,
    type: Number,
  },
  status: {
    required: true,
    type: String,
  },
});
module.exports = mongoose.model("allprojects", allProjectsSchema);
