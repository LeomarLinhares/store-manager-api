const msg = require('../messages/messages');
const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

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

  checkStock: async (req, res, next) => {
    try {
      const order = req.body;
  
      const haveEverythingInStock = await order.reduce(async (acc, curr) => {
        const productInStock = await productsModel.getById(curr.product_id);
        const haveInStock = productInStock[0].quantity >= curr.quantity;
        const resolvedAcc = await acc;
        return (haveInStock && resolvedAcc);
      }, true);
  
      if (!haveEverythingInStock) res.status(422).json({ message: msg.OUT_OF_STOCK });
  
      next();
    } catch (error) {
      console.log(error);
    }
  },
};
