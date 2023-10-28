const express = require("express");
const app = express();
const logger = require("./logger");
const cookieParser = require("cookie-parser");

// routers
const peopleRouter = require("./routes/people");
const productsRouter = require("./routes/products");
const queryRouter = require("./routes/query");

// middleware
app.use([
  express.static("./public"),
  logger,
  express.urlencoded({ extended: false }),
  express.json(),
  cookieParser(),
]);

const auth = (req, res, next) => {
  if (!req.cookies.name) {
    return res.status(401).json({ msg: "Unathorized" });
  }
  req.user = req.cookies.name;
  next();
};

// routes
app.post("/logon", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "Please provide a name" });
  }
  res.status(201).cookie("name", req.body.name).send(`Hello ${req.body.name}`);
});

app.delete("/logoff", (req, res) => {
  res.clearCookie("name");
  res.status(200).json({ msg: "User is logged off" });
});

app.get("/test", auth, (req, res) => {
  res.status(200).json({ msg: `Welcome ${req.user}` });
});

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked" });
});
app.use("/api/v1/query", queryRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/people", peopleRouter);
app.all("*", (req, res) => {
  res.status(404).send("<h1> Oh no! Your page was not found.</h1>");
});

// PORT
app.listen(3000, () => {
  console.log("App is listening on port 3000. Woot woot!");
});
