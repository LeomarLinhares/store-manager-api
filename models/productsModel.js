const connection = require('./connection');

const getAll = async () => {
  const [rows] = await connection.execute('SELECT * FROM products');
  return rows;
};

const getById = async (id) => {
  const [row] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  const product = row[0];
  return product;
};

const create = async (name, quantity) => {
  const [rows] = await connection.execute(
    'INSERT INTO products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );

  return {
    id: rows.insertId,
    name,
    quantity,
  };
};

const update = async (name, quantity, id) => {
  await connection.execute(`
    UPDATE products
      SET name = ?, quantity = ?
    WHERE id = ?
  `, [name, quantity, id]);
  return { id, name, quantity };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
