const mongoose = require("mongoose");

const db = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/practice")
    .then(() => console.log("database successfully connected"))
    .catch((err) => console.log(err));
};

module.exports = db;
