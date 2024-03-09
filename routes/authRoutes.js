const express = require("express");
const { signin, signup, sendOTP, verifyOTP, resendOTP } = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/signin",signin);
authRouter.post("/signup",signup);
authRouter.post("/verifyOTP", verifyOTP);
authRouter.post("/resendOTP", resendOTP);




module.exports = authRouter;