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

  describe('quando chamada a função getAll', () => {
    const salesModelResponse = [
      { id: 1, date: '2022-02-10T15:50:30.000Z' },
      { id: 2, date: '2022-03-10T11:52:20.000Z' },
    ];
    const salesProductsModelResponse = [
      { sale_id: 1, product_id: 2, quantity: 2 },
      { sale_id: 2, product_id: 4, quantity: 1 },
      { sale_id: 2, product_id: 2, quantity: 1 },
    ];

    before(async () => {
      sinon.stub(salesModel, 'getAll').resolves(salesModelResponse);
      sinon.stub(salesProductsModel, 'getAll').resolves(salesProductsModelResponse);
    });

    after(async () => {
      salesModel.getAll.restore();
      salesProductsModel.getAll.restore();
    });

    it('retorna uma lista de objetos', async () => {
      const result = await salesService.getAll();
      expect(result).to.be.an('array');
      expect(result[0]).to.be.an('object');
    });

    it('os objetos contém saleId, date, product_id e quantity', async () => {
      const result = await salesService.getAll();
      expect(result[0].saleId).to.be.a('number');
      expect(result[0].date).to.be.a('string');
      expect(result[0].product_id).to.be.a('number');
      expect(result[0].quantity).to.be.a('number');
    })
  });

  describe('quando chamada a função getById', () => {
    const salesModelResponse = [{ id: 1, date: '2022-02-10T15:50:30.000Z' }];
    const salesProductsModelResponse = [{sale_id: 1, product_id: 2, quantity: 2 }];

    before(async () => {
      sinon.stub(salesModel, 'getById').resolves(salesModelResponse);
      sinon.stub(salesProductsModel, 'getById').resolves(salesProductsModelResponse);
    });

    after(async () => {
      salesModel.getById.restore();
      salesProductsModel.getById.restore();
    });

    it('retorna uma lista de objetos', async () => {
      const result = await salesService.getById(1);
      expect(result).to.be.an('array');
      expect(result[0]).to.be.an('object');
    });
  });

  describe('quando chamada a função update', () => {
    const SALE_ID = 1;
    const UPDATING_ITEMS = [{ product_id: 1, quantity: 3 }];
    const salesProductsModelResponse = [{sale_id: 1, product_id: 2, quantity: 2 }];

    before(async () => {
      sinon.stub(salesProductsModel, 'getById').resolves(salesProductsModelResponse);
      sinon.stub(salesProductsModel, 'update').resolves(undefined);
    });

    after(async () => {
      salesProductsModel.getById.restore();
      salesProductsModel.update.restore();
    });

    it('retorna um objeto com saleId e um array em itemUpdated', async () => {
      const result = await salesService.update(SALE_ID, UPDATING_ITEMS);
      expect(result).to.be.an('object');
      expect(result.saleId).to.be.a('number');
      expect(result.itemUpdated).to.be.an('array');
    });
  });

  // describe('quando chamada a função remove', () => {});

  // --------- Funções de apoio ----------
  // describe('quando chamada a função deleteSaleId', () => {});
  // describe('quando chamada a função updateStockFromSale', () => {});
  // describe('quando chamada a função restoreStockFromSale', () => {});
});
