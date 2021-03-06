const salesService = require('../services/salesService');

module.exports = {
  createSale: async (req, res) => {
    const sales = req.body;
    const response = await salesService.create(sales);
    res.status(201).json(response);
  },

  getAllSales: async (_req, res) => {
    const response = await salesService.getAll();
    res.status(200).json(response);
  },

  getSaleById: async (req, res) => {
    const { id } = req.params;
    const response = await salesService.getById(id);
    res.status(200).json(response);
  },

  updateSale: async (req, res) => {
    const { id } = req.params;
    const items = req.body;
    const response = await salesService.update(id, items);
    res.status(200).json(response);
  },

  deleteSale: async (req, res) => {
    const { id } = req.params;
    const response = await salesService.remove(id);
    res.status(200).json(response);
  },
};
