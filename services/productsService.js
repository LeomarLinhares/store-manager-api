const productsModel = require('../models/productsModel');

const create = async ({ name, quantity }) => {
  try {
    const response = await productsModel.create({ name, quantity });
    return response;
  } catch (error) {
    console.log(error);
    return { message: 'não rolou' };
  }
};

module.exports = {
  create,
};
