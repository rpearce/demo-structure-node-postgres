import { expect } from 'chai';
import { isValid } from './user';

const name = 'Robert',
      email = 'test@robert.com',
      network_id = 'b9dee03c-daf6-4656-9643-c93d78fe5758';

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
