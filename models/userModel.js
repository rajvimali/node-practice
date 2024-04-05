const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  age: {
    type: Number,
    default: 20,
  },
  course: {
    type: String,
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
