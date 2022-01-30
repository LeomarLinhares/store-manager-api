module.exports = {
  SELECT_ALL_PRODUCTS: 'SELECT * FROM StoreManager.products',
  SELECT_PRODUCTS_BY_ID: 'SELECT * FROM StoreManager.products WHERE id = ?',
  INSERT_PRODUCT: 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)',
  UPDATE_PRODUCT: 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?',
  REMOVE_PRODUCT: 'DELETE FROM StoreManager.products WHERE id = ?',

  INSERT_SALE: 'INSERT INTO StoreManager.sales (`date`) VALUE (CURRENT_TIMESTAMP)',

  INSERT_SALES_PRODUCTS: `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES ?`,
};
