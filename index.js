require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const {
  create,
  getAll,
} = require('./controllers/productsController');

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

app.route('/products')
  .post(validateName, validateIfProductExists, validateQuantity, create)
  .get(getAll);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
