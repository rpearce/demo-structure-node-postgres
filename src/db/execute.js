import pgPromise from 'pg-promise';
import connection from './connection';

export default (query) => {
  const pgp = pgPromise(),
        db = pgp(connection);

  db
    .query(query)
    .then(data => console.log(data))
    .catch(err => console.error(error))
    .then(pgp.end);
}
