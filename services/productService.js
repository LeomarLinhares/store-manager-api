const productsModel = require('../models/productsModel');

const create = async ({ name, quantity }) => {
  try {
    const response = await productsModel.create({ name, quantity });
    return response;
  } catch (error) {
    return error;
  }
};

module.exports = {
  create,
};
