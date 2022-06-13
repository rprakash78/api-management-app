const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'dev'
const dbConfig = require('../config/db.json')[env]

// console.log(dbconfig)
const sequelize = new Sequelize(`postgres://${dbConfig.userName}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`, {
  host: dbConfig.host,
  dialect: 'postgres',
  logging: false,
  // operatorsAliases: Sequelize.Op,
  port: 5432
//   ssl: false,
//   pool: {
//     max: dbconfig.options.pool.max,
//     min: dbconfig.options.pool.min,
//     acquire: dbconfig.options.pool.acquire,
//     idle: dbconfig.options.pool.idle
//   }
})

// console.log(sequelize);

sequelize
  .sync()
  .then(() => {
    console.log('Postgres Connection established successfully.')
  })
  .catch((err) => {
    console.log(err)
    console.log(`Unable to establish connection: ${err}`)
  })

module.exports = sequelize
