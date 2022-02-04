const connection = require('./connection');
const QUERY = require('../helpers/queries');

module.exports = {
  create: async (allSales) => {
    const [rows] = await connection.query(QUERY.INSERT_SALES_PRODUCTS, [allSales]);
    return rows;
  },

  getAll: async () => {
    const [rows] = await connection.execute(QUERY.SELECT_ALL_SALES_PRODUCTS);
    return rows;
  },

  getById: async (id) => {
    const [rows] = await connection.execute(QUERY.SELECT_ALL_SALES_PRODUCTS_BY_ID, [id]);
    console.log(rows);
    return rows;
  },
};
