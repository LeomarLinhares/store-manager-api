const productsModel = require('../models/productsModel');
const msg = require('../helpers/messages');

const create = async ({ name, quantity }) => {
  try {
    const response = await productsModel.create(name, quantity);
    return response;
  } catch (error) {
    console.log(error);
    return { message: msg.DATABASE_ERROR_CREATE };
  }
};

const getAll = async () => {
  try {
    const response = await productsModel.getAll();
    return response;
  } catch (error) {
    console.log(error);
    return { message: msg.COULD_NOT_GET_PRODUCTS };
  }
};

module.exports = {
  create,
  getAll,
};
