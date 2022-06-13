const Sequelize = require('sequelize')
const sequelize = require('../connections/db')

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    email: {
      type: Sequelize.STRING,
      allowNull:false,
      primaryKey:true
   },
   threshold: {
        type: Sequelize.INTEGER,
        allowNull: false  
   },
   key: {
        type: Sequelize.STRING
   },
   counter: {
        type: Sequelize.INTEGER
   },
   createdAt: Sequelize.DATE,
   updatedAt: Sequelize.DATE,
});

module.exports = User