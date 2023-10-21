const { products } = require("../data");

const searchProducts = (req, res) => {
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
};

module.exports = { searchProducts };
