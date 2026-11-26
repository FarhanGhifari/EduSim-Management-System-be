module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  database: {
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || '5432',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    dbname: process.env.DB_NAME || ''
  }
}
