const express = require("express");
const app = express();
const logger = require("./logger");

// req => middleware => res
app.use(logger);

app.get("/", logger, (req, res) => {
  res.send("Home");
});

app.get("/about", (req, res) => {
  res.send("About");
});

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000 :-)");
});
