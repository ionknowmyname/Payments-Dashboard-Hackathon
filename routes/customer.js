const express = require("express");
const router = express.Router();

const customers = require("../controllers/customerController");


router.post("/create", customers.create);


module.exports = router;
