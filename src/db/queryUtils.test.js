import { expect } from 'chai';
import { find, create, update, destroy } from './queryUtils';

const name = 'Robert',
      email = 'test@robert.com',
      network_id = 'b9dee03c-daf6-4656-9643-c93d78fe5758';

describe('Query Utils', () => {
  before((done) => {
    destroy({ table: 'users' })
      .then(() => {
        find({ table: 'users' })
          .then((users) => {
            expect(users.length).to.equal(0);
            done();
          })
          .catch(console.error);
      })
      .catch(console.error);
  });

  describe('create', () => {
    it('creates a record in the DB and returns its id', (done) => {
      create({ table: 'users', attrs: { name, email, network_id } })
        .then((res) => {
          expect(res[0].match(/-/g).length).to.equal(4); // simple UUID format test
          find({ table: 'users' })
            .then((users) => {
              expect(users.length).to.equal(1);
              done();
            })
            .catch(console.error);
        })
        .catch(console.error);
    });

    it('catches errors from the DB', (done) => {
      create({ table: 'users', attrs: { name: null, email, network_id } })
        .catch((err) => {
          expect(err.name).to.equal('error');
          done();
        });
    });
  });

  describe('find', () => {});

  describe('update', () => {});

  describe('destroy', () => {});
});
