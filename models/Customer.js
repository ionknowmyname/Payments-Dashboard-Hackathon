const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    ownerId: {
      type: String,  // ObjectId
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    businessName: {
      type: String,
      required: true,
    },
    businessEmail: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please Enter a valid email",
      ],
    },
    businessNumber: {
      type: String,
      required: true,
      // unique: true,
      match: [/^\+(?:[0-9] ?){12}[0-9]$/, "Please Enter a valid Phonenumber"],
    },
    businessAddress: {
      type: String,
      //  required: true,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
