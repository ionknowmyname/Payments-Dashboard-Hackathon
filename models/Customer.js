const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    ownerId: {
      type: String,  // ObjectId
      required: true,
    },
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
    addressId: {
      type: String,
      //  required: true,
    },

  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
