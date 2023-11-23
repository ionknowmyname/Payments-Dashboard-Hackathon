const express = require("express");
const router = express.Router();

const users = require("../controllers/userController");


router.post("/test", async (req, res) => {
    res.status(200).json({ message: "Testing successful" });
});


router.post("/register", users.create);



module.exports = router;