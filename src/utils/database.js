const pg = require('pg');
const Sequelize = require('sequelize');

/**
 * Creates a new Sequelize instance with the specified configuration for 
 * connecting to a PostgreSQL database. 
 */
const customLogger = (message) => {
    console.log('Log:', message);
  };
const sequelize = new Sequelize(
    'talkitout', 
    'tio_admin_faiz', 
    'tio_admin_access', 
    {
        dialect: 'postgres',
        host: '127.0.0.1',
        logging: customLogger,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

module.exports = sequelize;