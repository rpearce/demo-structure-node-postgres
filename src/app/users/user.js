import pgPromise from 'pg-promise';
import connection from '../../db/connection';

export const isValid = ({ name, email, networkId, image, updatedAt }) =>
  !!name && !!email && !!networkId;

export const create = (attrs) => {
  if (isValid(attrs)) {
    let pgp = pgPromise(),
        db = pgp(connection),
        { name, email, image, networkId } = attrs;
    console.log(db);
    db
      .query('INSERT INTO users(name, email, image, network_id) VALUES ($1, $2, $3, $4)', [name, email, image, networkId])
      .then(data => console.log(data))
      .catch(err => console.error(err))
      .then(pgp.end);
  } else {
    console.error('Invalid User');
    return false;
  }
}
