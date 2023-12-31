const express = require("express");
const router = express.Router();

const customers = require("../controllers/customerController");
const { authenticate } = require("../config/authentication");


router.post("/create", authenticate, customers.create);


module.exports = router;
