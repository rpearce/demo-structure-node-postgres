const devConnection = {
  host: '127.0.0.1',
  port: 5432,
  database: 'reservations_development',
  user: '',
  password: ''
};

export default process.env.DATABASE_URL || devConnection;
