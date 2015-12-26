import dbInfo from './database';

const { host, port, database, user, password } = dbInfo.dev;

export default process.env.DATABASE_URL || { host, port, database, user, password };
