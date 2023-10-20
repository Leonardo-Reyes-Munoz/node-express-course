const express = require("express");
const app = express();
const { products, people } = require("./data");

const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = Date.now();
  console.log(method, url, time);

  next();
};

app.use([
  logger,
  express.static("./public"),
  express.urlencoded({ extended: false }),
  express.json(),
]);

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked" });
});

app.get("/api/v1/products", (req, res) => {
  res.send(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);
  if (!product) {
    return res.status(404).json({ message: "That product was not found" });
  }
  res.json(product);
});

app.get("/api/v1/query", (req, res) => {
  console.log(req.query);
  let newProducts = [...products];
  const { search, limit, priceLimit } = req.query;
  if (search) {
    newProducts = newProducts.filter((product) => {
      return product.name.includes(search);
    });
  }
  if (limit) {
    newProducts = newProducts.slice(0, Number(limit));
  }
  if (priceLimit) {
    newProducts = newProducts.filter((product) => {
      return Number(product.price) <= priceLimit;
    });
  }
  res.json(newProducts);
});

app.get("/api/v1/people", (req, res) => {
  res.json({ sucess: true });
});

app.post("/api/v1/people", (req, res) => {
  if (req.body.name) {
    people.push({ id: people.length + 1, name: req.body.name });
    res.status(201).json({ success: true, name: req.body.name });
  } else {
    res.status(400).json({ success: false, message: "Please provide a name" });
  }
});

app.all("*", (req, res) => {
  res.status(404).send("<h1> Oh no! Your page was not found.</h1>");
});

app.listen(3000, () => {
  console.log("App is listening on port 3000. Woot woot!");
});
