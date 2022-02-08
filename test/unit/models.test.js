const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../models/connection');
const productsModel = require('../../models/productsModel');

describe('O model productsModel', () => {
  describe('quando chamada a função getAll', () => {
    beforeAll(async () => {
      sinon.stub(connection, 'execute').resolves([[], []]);
    });

    afterAll(async () => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const result = await productsModel.getAll();
      expect(result).to.be.an('array');
    });
  });
});
