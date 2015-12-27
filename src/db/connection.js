import dbInfo from './database';

const envInfo = process.env.NODE_ENV === 'test' ? dbInfo.test : dbInfo.dev;
const { host, port, database, user, password } = envInfo;

export default process.env.DATABASE_URL || { host, port, database, user, password };
