const productService = require('../services/productService');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const response = productService.create({ name, quantity });
  res.status(201).json(response);
};

module.exports = {
  create,
};
