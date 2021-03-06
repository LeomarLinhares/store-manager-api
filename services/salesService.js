const salesModel = require('../models/salesModel');
const salesProductsModel = require('../models/salesProductsModel');
const productsModel = require('../models/productsModel');

// Essa função só existe para atender as exigências do ESLint no momento de avaliação,
// logo deve ser refatorada assim que for utilizada em portfólio
const deleteSaleId = (productsArray, sale) => (productsArray.reduce((acc, curr) => {
  const result = { ...curr, date: sale.date };
  delete result.sale_id;

  return [...acc, result];
}, []));

const updateStockFromSale = async (order) => {
  order.forEach(async (product) => {
    const productInStock = await productsModel.getById(product.product_id);
    await productsModel.update({
      name: productInStock[0].name,
      id: productInStock[0].id,
      quantity: productInStock[0].quantity - product.quantity,
    });
  });
};

const restoreStockFromSale = async (id, quantity) => {
  const productFromDeletedSale = await productsModel.getById(id);
  await productsModel.update({
    name: productFromDeletedSale[0].name,
    id: productFromDeletedSale[0].id,
    quantity: productFromDeletedSale[0].quantity + quantity,
  });
};

module.exports = {
  create: async (order) => {
    try {
      const { insertId } = await salesModel.create();
      const allSales = order.map((product) => [insertId, product.product_id, product.quantity]);
      await salesProductsModel.create(allSales);
      await updateStockFromSale(order);
      return {
        id: insertId,
        itemsSold: order,
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

      return deleteSaleId(products, sale);
    } catch (error) {
      console.log(error);
    }
  },

  update: async (id, items) => {
    try {
      const allSales = await salesProductsModel.getById(id);

      const changedItems = await items.reduce(async (acc, curr) => {
        const existingProductOnSale = allSales.find((sale) => sale.product_id === curr.product_id);
        if (existingProductOnSale !== undefined) {
          await salesProductsModel.update(curr.product_id, curr.quantity, id);
          const resolvedAccumulator = await acc;
          return [...resolvedAccumulator, curr];
        }
        return acc;
      }, []);

      const response = { saleId: id, itemUpdated: changedItems };
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  remove: async (id) => {
    try {
      const [sale] = await salesModel.getById(id);
      const products = await salesProductsModel.getById(id);
      products.forEach((product) => restoreStockFromSale(product.product_id, product.quantity));
      await salesModel.remove(id);

      return deleteSaleId(products, sale);
    } catch (error) {
      console.log(error);
    }
  },
};

// Leomar do futuro, se liga:
// --------------------------
// você criou um reduce que mexe com funções assíncronas e o reduce trabalha com
// os retornos de cada iteração para gerar os Accumulators.
// O problema é que todos os retornos vão ser promises e antes de trabalhar com elas
// você tem que resolver. É por isso que você criou a variável resolvedAccumulator e colocou
// um await em frente ao acc. Assim você resolve a promise antes que possa desestruturar elas
// nos retornos do reduce.
