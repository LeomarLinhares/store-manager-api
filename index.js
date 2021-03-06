require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const {
  create,
  getAll,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('./controllers/productsController');

const {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
} = require('./controllers/salesController');

const {
  validateName,
  validateIfProductExists,
  validateQuantity,
  validateId,
} = require('./middlewares/validateProducts');

const {
  validateProductId,
  validateSalesQuantity,
  validateSaleId,
  checkStock,
} = require('./middlewares/validateSales');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.route('/sales/:id')
  .get(validateSaleId, getSaleById)
  .put(validateProductId, validateSalesQuantity, updateSale)
  .delete(validateSaleId, deleteSale);

app.route('/sales')
  .post(validateProductId, validateSalesQuantity, checkStock, createSale)
  .get(getAllSales);

app.route('/products/:id')
  .get(validateId, getProductById)
  .put(validateQuantity, validateName, validateId, updateProduct)
  .delete(validateId, deleteProduct);

app.route('/products')
  .post(validateName, validateIfProductExists, validateQuantity, create)
  .get(getAll);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
