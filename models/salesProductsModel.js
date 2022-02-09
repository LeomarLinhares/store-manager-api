const connection = require('./connection');
const QUERY = require('../helpers/queries');

const create = async (allSales) => {
  const [rows] = await connection.query(QUERY.INSERT_SALES_PRODUCTS, [allSales]);
  return rows;
};

const getAll = async () => {
  const [rows] = await connection.execute(QUERY.SELECT_ALL_SALES_PRODUCTS);
  return rows;
};

const getById = async (id) => {
  const [rows] = await connection.execute(QUERY.SELECT_ALL_SALES_PRODUCTS_BY_ID, [id]);
  return rows;
};

const update = async (productId, quantity, saleId) => {
  await connection.execute(QUERY.UPDATE_SALES_PRODUCTS, [quantity, saleId, productId]);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
