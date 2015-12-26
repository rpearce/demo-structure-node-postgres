import execute from './execute';

const query = `CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  name varchar,
  email varchar,
  network_id int,
  created_at timestamp,
  updated_at timestamp
);`;

export default () => execute(query);
