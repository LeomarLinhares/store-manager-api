module.exports = {
  SELECT_ALL: 'SELECT * FROM StoreManager.products',
  SELECT_BY_ID: 'SELECT * FROM StoreManager.products WHERE id = ?',
  INSERT_PRODUCT: 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)',
  UPDATE_PRODUCT: 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?',
  REMOVE_PRODUCT: 'DELETE FROM StoreManager.products WHERE id = ?',
};
