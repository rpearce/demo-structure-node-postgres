import { expect } from 'chai';
import faker from 'faker';
import { isValidUser } from './user';


const name = faker.name.findName(),
      email = faker.internet.email(),
      network_id = faker.random.uuid();

describe('User', () => {
  describe('isValidUser', () => {
    it('is valid when required attrs are present', () => {
      expect(isValidUser({ name, email, network_id })).to.equal(true);
    });
    it('is invalid when name is blank', () => {
      expect(isValidUser({ name: '', email, network_id })).to.equal(false);
    });
    it('is invalid when email is blank', () => {
      expect(isValidUser({ name, email: '', network_id })).to.equal(false);
    });
    it('is invalid when networkId is blank', () => {
      expect(isValidUser({ name, email, network_id: '' })).to.equal(false);
    });
  });
});
