const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please Enter a valid email",
      ],
    },
    phoneNumber: {
      type: String,
      required: true,
      // unique: true,
      match: [/^\+(?:[0-9] ?){12}[0-9]$/, "Please Enter a valid Phonenumber"],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    age: {
      type: String,
      // required: true,
    },
    otp: {
      type: String,
      required: true,
      select: false,
    },
    isActive: {
      type: Boolean,
      // required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;