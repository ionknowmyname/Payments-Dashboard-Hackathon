const express = require("express");
const router = express.Router();

const address = require("../controllers/addressController");


router.post("/create", address.create);


module.exports = router;
