const express = require("express");
const { signin, signup, sendOTP } = require("../controllers/authController");

const router = express.Router();

router.get("/signin",signin);
router.post("/signup",signup);
router.get("/sendOTP", sendOTP)


module.exports = router;