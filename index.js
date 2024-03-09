var express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const userRouter = require("./routes/userRoutes");

dotenv.config();
var app = express();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

const date = new Date()
// create a write stream (in append mode)
// var accessLogStream = fs.createWriteStream(
//   path.join(__dirname, `/logs/access.log`),
//   { flags: "a" }
// );

const PORT = process.env.PORT;
// app.use(morgan("combined", { stream: accessLogStream }));
app.get("/", (req, res) => {
  res.send("This is my demo project");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);


const server = app.listen(PORT, function () {
  console.log(`Demo project at: ${PORT}!`);
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
