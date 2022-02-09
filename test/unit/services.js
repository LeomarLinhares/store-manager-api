const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../models/productsModel');
const productsService = require('../../services/productsService');

const resultSetHeader = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 1,
  info: '',
  serverStatus: 2,
  warningStatus: 0
};

describe('O service productsService', () => {
  describe('quando chamada a função create', () => {
    const payload = {
      name: 'DVD Sharknado',
      quantity: 1,
    }

    before(async () => {
      sinon.stub(productsModel, 'create').resolves(resultSetHeader);
    });

    after(async () => {
      productsModel.create.restore();
    });

    it('retorna um objeto contendo id, name e quantity', async () => {
      const result = await productsService.create(payload);
      expect(result).to.be.an('object');
      expect(result.id).to.be.equal(resultSetHeader.insertId);
      expect(result.name).to.be.equal(payload.name);
      expect(result.quantity).to.be.equal(payload.quantity);
    })
  });

  describe('quando chamada a função getAll', () => {
    before(async () => {
      sinon.stub(productsModel, 'getAll').resolves([{}, {}]);
    });

    after(async () => {
      productsModel.getAll.restore();
    });

    it('retorna uma lista de objetos', async () => {
      const result = await productsService.getAll();
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(2);
      expect(result[0]).to.be.an('object');
    })
  });

  // describe('quando chamada a função getById', () => {});
  // describe('quando chamada a função update', () => {});
  // describe('quando chamada a função remove', () => {});
});
