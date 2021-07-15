const mongoose = require("mongoose");
const validator = require('validator');

const UserSchema = new mongoose.Schema({});

const UserData = new mongoose.model("UserData", UserSchema);

module.exports = UserData;