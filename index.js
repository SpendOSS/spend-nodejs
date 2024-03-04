var express = require("express");
var app = express();
const PORT = process.env.PORT || 5050;
app.get("/", (req, res) => {
  res.send("This is my demo project");
});
const server = app.listen(PORT, function () {
  console.log(`Demo project at: ${PORT}!`);
});


server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
