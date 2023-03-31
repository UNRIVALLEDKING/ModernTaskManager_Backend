const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
  salt: {
    required: true,
    type: String,
  },
  hash: {
    required: true,
    type: String,
  },
});
module.exports = mongoose.model("user", userSchema);
