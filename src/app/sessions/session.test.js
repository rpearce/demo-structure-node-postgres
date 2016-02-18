import { expect } from 'chai';
import faker from 'faker';
import { update } from '../../db/queryUtils';
import { isValidSession, createSession } from './session';

describe('Session', () => {
  describe('isValidSession', () => {
    describe('when is_active is false', () => {
      const is_active = false;

      it('returns false', () => {
        const created_at = ((new Date()).toString());
        const result = isValidSession({ is_active, created_at });
        expect(result).to.equal(false);
      });
    });

    describe('when is_active is true', () => {
      const is_active = true;

      describe('when created_at is 15 minutes old', () => {
        it('returns false', () => {
          const time = new Date();
          time.setMinutes(time.getMinutes() - 15);
          const created_at = time.toString();
          const result = isValidSession({ is_active, created_at });
          expect(result).to.equal(false);
        });
      });

      describe('when created_at is >15 minutes old', () => {
        it('returns false', () => {
          const time = new Date();
          time.setMinutes(time.getMinutes() - 16);
          const created_at = time.toString();
          const result = isValidSession({ is_active, created_at });
          expect(result).to.equal(false);
        });
      });

      describe('when created_at is <15 minutes old', () => {
        it('returns true', () => {
          const time = new Date();
          time.setMinutes(time.getMinutes() - 14);
          const created_at = time.toString();
          const result = isValidSession({ is_active, created_at });
          expect(result).to.equal(true);
        });
      });
    });
  });
});
