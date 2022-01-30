const connection = require('./connection');
const QUERY = require('../helpers/queries');

const create = async (allSales) => {
  const [rows] = await connection.query(QUERY.INSERT_SALES_PRODUCTS, [allSales]);
  return rows;
};

module.exports = {
  create,
};
