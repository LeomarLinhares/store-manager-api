const productsService = require('../services/productsService');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const response = await productsService.create({ name, quantity });
  res.status(201).json(response);
};

const getAll = async (_req, res) => {
  const response = await productsService.getAll();
  res.status(200).json(response);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const response = await productsService.getById(id);
  res.status(200).json(response);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const response = await productsService.update({ id, name, quantity });
  res.status(200).json(response);
};

module.exports = {
  create,
  getAll,
  getProductById,
  updateProduct,
};
