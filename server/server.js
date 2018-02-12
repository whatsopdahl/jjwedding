const express = require('express');
const app = express();
const port = 8080;
const path = require("path");
const logger = require("./logger.js");
const bodyParser = require("body-parser");

app.use(express.static(path.resolve(__dirname, "..")));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  try {
    //logger.logRequest(req);
  } catch (e) {
    console.error(e);
  }
  next();
});

app.get("/data", (req, res) => {
  console.log(req);
  res.send(200);
});


app.listen(port, () => {
  console.log(`Wedding server listening on port ${port}`);
});
