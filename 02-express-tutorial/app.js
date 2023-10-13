const express = require("express");
const app = express();
const { products } = require("./data");

app.get("/", (req, res) => {
  res.send('<h1>Home Page</h1><a href="/api/products">Products</a>');
});

app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
});

app.get("/api/products/:productID", (req, res) => {
  // console.log(req);
  console.log(req.params);
  const { productID } = req.params;
  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  );
  if (!singleProduct) {
    return res.status(404).send(`Product "${productID}" Does not Exist`);
  }
  res.json(singleProduct);
});

app.get("/api/products/:productsID/reviews/:reviewID", (req, res) => {
  console.log(req.params);
  res.send("Hello test");
});

app.listen(3000, () => {
  console.log("Server is listening on PORT 3000! What what!");
});
