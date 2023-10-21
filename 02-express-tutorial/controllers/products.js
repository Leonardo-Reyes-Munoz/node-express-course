const { products } = require("../data");

const getAllProducts = (req, res) => {
  res.send(products);
};

const getSingleProduct = (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);
  if (!product) {
    return res
      .status(404)
      .json({ message: `Product with id:${idToFind} was not found.` });
  }
  res.json(product);
};

module.exports = { getAllProducts, getSingleProduct };
