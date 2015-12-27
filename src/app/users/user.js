import pgPromise from 'pg-promise';
import connection from '../../db/connection';

export const isValid = ({ name, email, networkId }) =>
  !!name && !!email && !!networkId;

export const create = (attrs) =>
  new Promise((resolve, reject) => {
    if (isValid(attrs)) {
      let pgp = pgPromise(),
          db = pgp(connection),
          { name, email, image, networkId } = attrs;
      db
        .query('INSERT INTO users(name, email, image, network_id) VALUES ($1, $2, $3, $4)', [name, email, image, networkId])
        .catch(err => reject(err))
        .then(pgp.end)
        .then(resolve);
    } else {
      reject('Invalid User');
    }
  });

export const destroy = (id) =>
  new Promise((resolve, reject) => {
    let pgp = pgPromise(),
        db = pgp(connection);
    db
      .query('DELETE FROM users WHERE id IS $1', [id])
      .catch(err => reject(err))
      .then(pgp.end)
      .then(resolve);
  });
