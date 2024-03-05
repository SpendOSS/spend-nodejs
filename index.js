var express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const dotenv = require("dotenv");
dotenv.config();
var app = express();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("This is my demo project");
});
app.use("/api/auth", authRouter);

const server = app.listen(PORT, function () {
  console.log(`Demo project at: ${PORT}!`);
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
