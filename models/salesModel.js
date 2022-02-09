const connection = require('./connection');
const QUERY = require('../helpers/queries');

const create = async () => {
  const [rows] = await connection.execute(QUERY.INSERT_SALE);
  return rows;
};

const getAll = async () => {
  const [rows] = await connection.execute(QUERY.SELECT_ALL_SALES);
  return rows;
};

const getById = async (id) => {
  const [rows] = await connection.execute(QUERY.SELECT_SALE_BY_ID, [id]);
  return rows;
};

module.exports = {
  create,
  getAll,
  getById,
};
