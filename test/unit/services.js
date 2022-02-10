const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');
const salesProductsModel = require('../../models/salesProductsModel');
const productsService = require('../../services/productsService');
const salesService = require('../../services/salesService');

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

  describe('quando chamada a função getById', () => {
    before(async () => {
      sinon.stub(productsModel, 'getById').resolves([{}]);
    });

    after(async () => {
      productsModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      const result = await productsService.getById();
      expect(result).to.be.an('object');
    })

  });

  describe('quando chamada a função update', () => {
    const payload = {
      id: 3,
      name: 'DVD Diário de uma Princesa',
      quantity: 1,
    }

    before(async () => {
      sinon.stub(productsModel, 'update').resolves(payload);
    });

    after(async () => {
      productsModel.update.restore();
    });

    it('retorna objeto com as informações atualizadas', async () => {
      const result = await productsService.update(payload);
      expect(result).to.be.an('object');
      expect(result.id).to.be.equal(payload.id);
      expect(result.name).to.be.equal(payload.name);
      expect(result.quantity).to.be.equal(payload.quantity);
      expect(result.id).to.be.a('number');
      expect(result.name).to.be.a('string');
      expect(result.quantity).to.be.a('number');
    })
  });

  describe('quando chamada a função remove', () => {
    before(async () => {
      sinon.stub(productsModel, 'getById').resolves([{}]);
      sinon.stub(productsModel, 'remove').resolves(undefined);
    });

    after(async () => {
      productsModel.getById.restore();
      productsModel.remove.restore();
    });

    it('retorna um objeto', async () => {
      const result = await productsService.remove(2);
      expect(result).to.be.an('object');
    })
  });
});

describe('O service salesService', () => {
  describe('quando chamada a função create', () => {
    before(async () => {
      sinon.stub(salesModel, 'create').resolves(resultSetHeader);
      sinon.stub(salesProductsModel, 'create').resolves(undefined);
    });

    after(async () => {
      salesModel.create.restore();
      salesProductsModel.create.restore();
    });

    it('retorna um objeto contendo id, itemsSold', async () => {
      const result = await salesService.create([]);
      expect(result).to.be.an('object');
      expect(result.id).to.be.equal(resultSetHeader.insertId);
      expect(result.itemsSold).to.be.an('array');
    });
  });

  // describe('quando chamada a função getAll', () => {});
  // describe('quando chamada a função getById', () => {});
  // describe('quando chamada a função update', () => {});
  // describe('quando chamada a função remove', () => {});

  // --------- Funções de apoio ----------
  // describe('quando chamada a função deleteSaleId', () => {});
  // describe('quando chamada a função updateStockFromSale', () => {});
  // describe('quando chamada a função restoreStockFromSale', () => {});
});
