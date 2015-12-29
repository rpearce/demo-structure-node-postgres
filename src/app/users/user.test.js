import { expect } from 'chai';
import faker from 'faker';
import { isValid } from './user';


const name = faker.name.findName(),
      email = faker.internet.email(),
      network_id = faker.random.uuid();

describe('User', () => {
  describe('isValid', () => {
    it('is valid when required attrs are present', () => {
      expect(isValid({ name, email, network_id })).to.equal(true);
    });
    it('is invalid when name is blank', () => {
      expect(isValid({ name: '', email, network_id })).to.equal(false);
    });
    it('is invalid when email is blank', () => {
      expect(isValid({ name, email: '', network_id })).to.equal(false);
    });
    it('is invalid when networkId is blank', () => {
      expect(isValid({ name, email, network_id: '' })).to.equal(false);
    });
  });
});
