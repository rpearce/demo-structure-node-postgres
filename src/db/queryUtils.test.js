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

    it('catches a failed insert', async (done) => {
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

  describe('findOrCreate', () => {
  });

  describe('update', () => {
    const name = faker.name.findName(),
          email = faker.internet.email(),
          network_id = faker.random.uuid();

    beforeEach(async (done) => {
      try {
        await create({ table: 'users', attrs: { name, email, network_id } });
        done();
      } catch (err) {
        console.error(err);
        done();
      }
    });

    it('updates the record successfully', async (done) => {
      try {
        const res = await find({ table: 'users', where: { email } });
        expect(res[0].name).to.equal(name);

        const newName = faker.name.findName();
        await update({ table: 'users', where: { email }, attrs: { name: newName } })

        const res2 = await find({ table: 'users', where: { email } });
        expect(res2[0].name).to.equal(newName);
        done();
      } catch (err) {
        console.error(err);
        done();
      }
    });

    it('catches a failed update', async (done) => {
      try {
        await update({ table: 'users', where: { email }, attrs: { name: null } })
      } catch (err) {
        expect(err.name).to.equal('error');
        done();
      }
    });
  });

  describe('destroy', async (done) => {
    const name = faker.name.findName(),
          email = faker.internet.email(),
          network_id = faker.random.uuid();

    beforeEach(async (done) => {
      try {
        await create({ table: 'users', attrs: { name, email, network_id } });
        done();
      } catch (err) {
        console.error(err);
        done();
      }
    });

    it('deletes a record given a condition', async (done) => {
      try {
        const res = await find({ table: 'users', where: { email } });
        expect(res.length).to.equal(1);
        await destroy({ table: 'users', where: { id: res[0].id } });
        const res2 = await find({ table: 'users', where: { email } });
        expect(res2.length).to.equal(0);
        done();
      } catch (err) {
        console.error(err);
        done();
      }
    });
  });
});
