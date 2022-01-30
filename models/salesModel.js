const connection = require('./connection');
const QUERY = require('../helpers/queries');

const create = async () => {
  const [rows] = await connection.execute(QUERY.INSERT_SALE);
  return rows;
};

module.exports = {
  create,
};
