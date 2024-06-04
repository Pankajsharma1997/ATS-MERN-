const mongoose = require('mongoose');
const subscriberSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  password: String,
  pic: {
    type: "String",
    required: true,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
});
module.exports = mongoose.model("subscribers",subscriberSchema);