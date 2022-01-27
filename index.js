require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');
const {
  validateName,
  validateIfProductExists,
  validateQuantity,
} = require('./middlewares/validateProducts');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.route('/products/')
  .post(validateName, validateIfProductExists, validateQuantity, productsController.create);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
