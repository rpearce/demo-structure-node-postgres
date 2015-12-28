import { expect } from 'chai';
import { find, create, update, destroy } from './queryUtils';

const name = 'Robert',
      email = 'test@robert.com',
      network_id = 'b9dee03c-daf6-4656-9643-c93d78fe5758';

describe('Query Utils', () => {
  before(async (done) => {
    try {
      await destroy({ table: 'users' });
      const users = await find({ table: 'users' });
      expect(users.length).to.equal(0);
      done();
    } catch (err) {
      console.error(err);
    }
  });

  describe('create', () => {
    it('creates a record in the DB and returns its id', async (done) => {
      try {
        const res = await create({ table: 'users', attrs: { name, email, network_id } });
        expect(res[0].match(/-/g).length).to.equal(4); // simple UUID format test
        const users = await find({ table: 'users' });
        expect(users.length).to.equal(1);
        done();
      } catch (err) {
        console.error(err);
      }
    });

    it('catches errors from the DB', async (done) => {
      try {
        await create({ table: 'users', attrs: { name: null, email, network_id } });
      } catch (err) {
        expect(err.name).to.equal('error');
        done();
      }
    });
  });

  describe('find', () => {});

  describe('update', () => {});

  describe('destroy', () => {});
});
