const connection = require('./connection');
const QUERY = require('../helpers/queries');

module.exports = {
  create: async () => {
    const [rows] = await connection.execute(QUERY.INSERT_SALE);
    return rows;
  },

  getAll: async () => {
    const [rows] = await connection.execute(QUERY.SELECT_ALL_SALES);
    return rows;
  },
};
