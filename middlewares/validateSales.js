const msg = require('../messages/messages');
const salesModel = require('../models/salesModel');

module.exports = {
  validateProductId: (req, res, next) => {
    const sales = req.body;
    const thereIsMissingProductId = sales.some((product) => !product.product_id);
    if (thereIsMissingProductId) return res.status(400).json({ message: msg.PRODUCT_ID_REQUIRED });

    next();
  },

  validateSalesQuantity: (req, res, next) => {
    const sales = req.body;
    const thereIsMissingQuantity = sales.some((product) => product.quantity === undefined);
    if (thereIsMissingQuantity) return res.status(400).json({ message: msg.QUANTITY_REQUIRED });
    const someQuantityIsInvalid = sales
      .some((sale) => typeof sale.quantity !== 'number' || sale.quantity < 1);
    if (someQuantityIsInvalid) return res.status(422).json({ message: msg.QUANTITY_LARGER_THAN_0 });

    next();
  },

  validateSaleId: async (req, res, next) => {
    const { id } = req.params;
    const [sale] = await salesModel.getById(id);
    if (!sale) return res.status(404).json({ message: msg.SALE_NOT_FOUND });

    next();
  },
};
