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

  getAll: async () => {
    try {
      const sales = await salesModel.getAll();
      const productsSold = await salesProductsModel.getAll();
  
      return productsSold.reduce((acc, curr) => {
        const correspondingSale = sales.find((sale) => sale.id === curr.sale_id);
        const sale = {
          saleId: curr.sale_id,
          date: correspondingSale.date,
          ...curr,
        };
        delete sale.sale_id;
        return [...acc, sale];
      }, []);
    } catch (error) {
      console.log(error);
    }
  },

  getById: async (id) => {
    try {
      const [sale] = await salesModel.getById(id);
      const products = await salesProductsModel.getById(id);

      return products.reduce((acc, curr) => {
        const result = { ...curr, date: sale.date };
        delete result.sale_id;

        return [...acc, result];
      }, []);
    } catch (error) {
      console.log(error);
    }
  },

  update: async (id, items) => {
    try {
      items.forEach(async (item) => {
        await salesProductsModel.update(item.product_id, item.quantity, id);
      });
      const response = {
        saleId: id,
        itemUpdated: items,
      };
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
