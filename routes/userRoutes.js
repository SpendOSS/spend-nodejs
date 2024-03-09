const express = require("express");
const { actionUser } = require("../controllers/userControllers");

const userRouter = express.Router();

userRouter.post("/actionUser", actionUser);

module.exports = userRouter;
