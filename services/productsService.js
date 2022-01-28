const productsModel = require('../models/productsModel');
const msg = require('../messages/messages');

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

const getById = async (id) => {
  try {
    const response = await productsModel.getById(id);
    return response[0];
  } catch (error) {
    console.log(error);
  }
};

const update = async (action) => {
  try {
    const response = await productsModel.update(action);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const remove = async (id) => {
  try {
    const response = await productsModel.getById(id);
    await productsModel.remove(id);
    return response[0];
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
