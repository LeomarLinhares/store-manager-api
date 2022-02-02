const salesService = require('../services/salesService');

module.exports = {
  createSale: async (req, res) => {
    const sales = req.body;
    const response = await salesService.create(sales);
    res.status(201).json(response);
  },

  getAllSales: async (req, res) => {
    const response = await salesService.getAll();
    res.status(200).json(response);
  },
};
