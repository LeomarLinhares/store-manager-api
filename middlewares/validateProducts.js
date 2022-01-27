const msg = require('../helpers/messages');
const productsModel = require('../models/productsModel');

module.exports = {
  validateName: (req, res, next) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: msg.NAME_REQUIRED });
    if (name.length < 5) return res.status(422).json({ message: msg.NAME_5_CHARACTERS });

    next();
  },

  validateIfProductExists: async (req, res, next) => {
    const { name } = req.body;
    const products = await productsModel.getAll();
    const alreadyExists = products.some((product) => product.name === name);
    if (alreadyExists) return res.status(409).json({ message: msg.PRODUCT_ALREADY_EXISTS });

    next();
  },
};
