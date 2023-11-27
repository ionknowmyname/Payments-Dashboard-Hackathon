const express = require("express");
const router = express.Router();

const invoice = require("../controllers/invoiceController");
const { authenticate } = require("../config/authentication");


router.post("/create", authenticate, invoice.create);


module.exports = router;
