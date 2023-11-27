const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceSchema = new Schema(
  {
    ownerId: {
      type: String, // ObjectId
      required: true,
    },
    customerId: {
      type: String, // ObjectId
      required: true,
    },
    transactionId: {
      type: String, // ObjectId
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    status: {
      type: String, // change to enum // cancelled, completed, failed, pending
      required: true,
      default: "pending"
    },
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;
