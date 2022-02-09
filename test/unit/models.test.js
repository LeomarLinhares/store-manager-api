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

  describe('quando chamada a função getById', () => {
    beforeAll(async () => {
      sinon.stub(connection, 'execute').resolves([[{}], []]);
    });

    afterAll(async () => {
      connection.execute.restore();
    });

    it('retorna um array contendo um único objeto', async () => {
      const result = await productsModel.getById(1);
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(1);
    });
  });

  describe('quando chamada a função create', () => {
    const resultSetHeader = {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 1,
      info: '',
      serverStatus: 2,
      warningStatus: 0
    };

    beforeAll(async () => {
      sinon.stub(connection, 'execute').resolves([resultSetHeader])
    });

    afterAll(async () => {
      connection.execute.restore();
    });
    
    it('retorna um objeto ResultSetHeader contendo o insertId', async () => {
      const result = await productsModel.create();
      expect(result).to.be.an('object');
      expect(result).to.have.property('insertId');
    });
  });
});
