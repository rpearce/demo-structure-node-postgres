import knexLib from 'knex';
import dbInfo from './database';

const envInfo = process.env.NODE_ENV === 'test' ? dbInfo.test : dbInfo.dev;
const { host, port, database, user, password } = envInfo;
const connection = knexLib({
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    host,
    port,
    database,
    user,
    password
  }
});

export default connection;
