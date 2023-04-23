const mongoose = require("mongoose");

const subscriptionScheme = new mongoose.Schema({
  email: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
});
module.exports = mongoose.model("subscription", subscriptionScheme);
