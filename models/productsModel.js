const connection = require('./connection');
const QUERY = require('../helpers/queries');

const getAll = async () => {
  const [rows] = await connection.execute(QUERY.SELECT_ALL);
  return rows;
};

const getById = async (id) => {
  const [row] = await connection.execute(QUERY.SELECT_BY_ID, [id]);
  return row;
};

const create = async (name, quantity) => {
  const [rows] = await connection.execute(QUERY.INSERT_PRODUCT, [name, quantity]);

  return {
    id: rows.insertId,
    name,
    quantity,
  };
};

const update = async (name, quantity, id) => {
  await connection.execute(QUERY.UPDATE_PRODUCT, [name, quantity, id]);
  return { id, name, quantity };
};

const remove = async (id) => {
  await connection.execute(QUERY.REMOVE_PRODUCT, [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
