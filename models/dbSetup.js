const {Sequelize,DataTypes} = require('sequelize');
const configDB = require('../config/configDB');

//connecting to postgres
const sequelize = new Sequelize(configDB.DB,configDB.USER,configDB.PASSWORD,{
    host:configDB.HOST,
    dialect:configDB.dialect,
    logging:false,
    pool:{
        max:configDB.pool.max,
        min:configDB.pool.min,
        acquire:configDB.pool.acquire,
        idle:configDB.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users =  require('./user')(sequelize,DataTypes);

module.exports = db;