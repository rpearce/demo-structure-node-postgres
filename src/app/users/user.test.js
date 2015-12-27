import { expect } from 'chai';
import { isValid, create, destroy } from './user';
import pgPromise from 'pg-promise';
import connection from '../../db/connection';

const name = 'Robert',
      email = 'test@robert.com',
      networkId = 'b9dee03c-daf6-4656-9643-c93d78fe5758',
      pgp = pgPromise();

describe('User', () => {
  before((done) => {
    const db = pgp(connection);
    db
      .query('DELETE FROM users')
      .catch(err => console.error(err))
      .then(pgp.end)
      .then(done);
  });

  describe('isValid', () => {
    it('is valid when required attrs are present', () => {
      expect(isValid({ name, email, networkId })).to.equal(true);
    });
    it('is invalid when name is blank', () => {
      expect(isValid({ name: '', email, networkId })).to.equal(false);
    });
    it('is invalid when email is blank', () => {
      expect(isValid({ name, email: '', networkId })).to.equal(false);
    });
    it('is invalid when networkId is blank', () => {
      expect(isValid({ name, email, networkId: '' })).to.equal(false);
    });
  });

  describe('create', () => {
  });

  describe('destroy', () => {
  });
});
