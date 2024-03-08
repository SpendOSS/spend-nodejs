const express = require("express");
const { signin, signup, sendOTP, verifyOTP } = require("../controllers/authController");

const router = express.Router();

router.post("/signin",signin);
router.post("/signup",signup);
router.get("/sendOTP", sendOTP);
router.post("/verifyOTP", verifyOTP)


module.exports = router;