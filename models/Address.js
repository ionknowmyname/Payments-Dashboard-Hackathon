const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema(
  {
    ownerId: {  // can be user or customer
      type: String, // ObjectId
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    postal: {
      type: String,
      // required: true,
    },
    addressType: {  // contact, invoice  or customer
      type: String,
      //  required: true,
    },
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
