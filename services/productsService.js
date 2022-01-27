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

module.exports = {
  create,
};
