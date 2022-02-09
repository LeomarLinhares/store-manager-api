const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../models/connection');
const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');
const salesProductsModel = require('../../models/salesProductsModel');

const resultSetHeader = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 1,
  info: '',
  serverStatus: 2,
  warningStatus: 0
};

describe('O model productsModel', () => {
  describe('quando chamada a função getAll', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[], []]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const result = await productsModel.getAll();
      expect(result).to.be.an('array');
    });
  });

  describe('quando chamada a função getById', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[{}], []]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array contendo um único objeto', async () => {
      const result = await productsModel.getById(1);
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(1);
    });
  });

  describe('quando chamada a função create', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([resultSetHeader])
    });

    after(async () => {
      connection.execute.restore();
    });
    
    it('retorna um objeto ResultSetHeader contendo o insertId', async () => {
      const result = await productsModel.create();
      expect(result).to.be.an('object');
      expect(result).to.have.property('insertId');
    });
  });

  describe('quando chamada a função update', () => {
    const payload = {
      id: 1,
      name: 'DVD Piratas do Caribe',
      quantity: 6,
    }

    before(async () => {
      sinon.stub(connection, 'execute').resolves([[{}], []]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('não retorna nada', async () => {
      const result = await productsModel.update(payload);
      expect(result).to.be.an('object');
      expect(result.name).to.be.a('string');
      expect(result.id).to.be.a('number');
      expect(result.quantity).to.be.a('number');
      expect(result.name).to.be.equal('DVD Piratas do Caribe');
      expect(result.id).to.be.equal(1);
      expect(result.quantity).to.be.equal(6);
    });
  });

  describe('quando chamada a função remove', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[{}], []]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('não retorna nada', async () => {
      const result = await productsModel.remove(1);
      expect(result).to.be.equal(undefined);
    });
  });
});

describe('O model salesModel', () => {
  describe('quando chamada a função create', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([resultSetHeader])
    });

    after(async () => {
      connection.execute.restore();
    });
  
    it('retorna um objeto ResultSetHeader contendo o insertId', async () => {
      const result = await salesModel.create();
      expect(result).to.be.an('object');
      expect(result).to.have.property('insertId');
    });
  });

  describe('quando chamada a função getAll', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[], []]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const result = await salesModel.getAll();
      expect(result).to.be.an('array');
    });
  });

  describe('quando chamada a função getById', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[{}], []]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array contendo um único objeto', async () => {
      const result = await salesModel.getById(1);
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(1);
    });
  });

});

describe('O model salesProductsModel', () => {
  describe('quando chamada a função create', () => {
    before(async () => {
      sinon.stub(connection, 'query').resolves([resultSetHeader])
    });

    after(async () => {
      connection.query.restore();
    });
  
    it('retorna um objeto ResultSetHeader contendo o insertId', async () => {
      const result = await salesProductsModel.create();
      expect(result).to.be.an('object');
      expect(result).to.have.property('insertId');
    });
  });

  describe('quando chamada a função getAll', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[], []]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const result = await salesProductsModel.getAll();
      expect(result).to.be.an('array');
    });
  });

  describe('quando chamada a função getById', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[{}], []]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array contendo um único objeto', async () => {
      const result = await salesProductsModel.getById(1);
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(1);
    });
  });

  describe('quando chamada a função update', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[{}], []]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('não retorna nada', async () => {
      const result = await salesProductsModel.update();
      expect(result).to.be.equal(undefined);
    });
  });
});