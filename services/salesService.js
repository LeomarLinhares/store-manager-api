const salesModel = require('../models/salesModel');
const salesProductsModel = require('../models/salesProductsModel');

module.exports = {
  create: async (sales) => {
    try {
      const { insertId } = await salesModel.create();
      const allSales = sales.map((product) => [insertId, product.product_id, product.quantity]);
      console.log(allSales);
      await salesProductsModel.create(allSales);
      return {
        id: insertId,
        itemsSold: sales,
      };
    } catch (error) {
      console.log(error);
    }
  },

  /* eslint-disable camelcase */
  getAll: async () => {
    const sales = await salesModel.getAll();
    const productsSold = await salesProductsModel.getAll();
    return productsSold.reduce((acc, curr) => {
      const correspondingSale = sales.find((sale) => sale.id === curr.sale_id);
      return [...acc, {
        saleId: curr.sale_id,
        date: correspondingSale.date,
        product_id: curr.product_id,
        quantity: curr.quantity,
      }];
    }, []);
  },
};
