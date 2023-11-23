const express = require("express");
const router = express.Router();

const auth = require("../controllers/authController");


router.post("/login", auth.login);

router.post("/activate", auth.activate);

router.post("/email/resend", auth.resendEmail);



module.exports = router;
