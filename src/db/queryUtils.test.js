import { expect } from 'chai';
import { find, create, update, destroy } from './queryUtils';
import faker from 'faker';

describe('Query Utils', () => {
  beforeEach(async (done) => {
    try {
      await destroy({ table: 'users' });
      const users = await find({ table: 'users' });
      expect(users.length).to.equal(0);
      done();
    } catch (err) {
      console.error(err);
      done();
    }
  });

  describe('create', () => {
    it('creates a record in the DB and returns its id', async (done) => {
      try {
        const res = await create({ table: 'users', attrs: { name: faker.name.findName(), email: faker.internet.email(), network_id: faker.random.uuid() } });
        expect(res[0].match(/-/g).length).to.equal(4); // simple UUID format test
        const users = await find({ table: 'users' });
        expect(users.length).to.equal(1);
        done();
      } catch (err) {
        console.error(err);
        done();
      }
    });

    it('catches errors from the DB', async (done) => {
      try {
        await create({ table: 'users', attrs: { name: null, email: faker.internet.email(), network_id: faker.random.uuid() } });
      } catch (err) {
        expect(err.name).to.equal('error');
        done();
      }
    });
  });

  describe('find', () => {
    const name = faker.name.findName(),
          network_id = faker.random.uuid();

    beforeEach(async (done) => {
      try {
        await create({ table: 'users', attrs: { name: faker.name.findName(), email: faker.internet.email(), network_id } });
        await create({ table: 'users', attrs: { name, email: faker.internet.email(), network_id } });
        await create({ table: 'users', attrs: { name: faker.name.findName(), email: faker.internet.email(), network_id: faker.random.uuid() } });
        done();
      } catch (err) {
        console.error(err);
        done();
      }
    });

    it('finds an individual record', async (done) => {
      try {
        const res = await find({ table: 'users', where: { name } });
        expect(res.length).to.equal(1);
        expect(res[0].name).to.equal(name);
        done();
      } catch (err) {
        console.error(err);
        done();
      }
    });

    it('finds multiple records', async (done) => {
      try {
        const res = await find({ table: 'users', where: { network_id } });
        expect(res.length).to.equal(2);
        done();
      } catch (err) {
        console.error(err);
        done();
      }
    });
  });

  describe('update', () => {});

  describe('destroy', () => {});
});
