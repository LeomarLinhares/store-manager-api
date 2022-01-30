const msg = require('../messages/messages');

module.exports = {
  validateProductId: (req, res, next) => {
    const sales = req.body;
    const thereIsMissingProductId = sales.some((product) => !product.product_id);
    if (thereIsMissingProductId) return res.status(400).json({ message: msg.PRODUCT_ID_REQUIRED });

    next();
  },
};
