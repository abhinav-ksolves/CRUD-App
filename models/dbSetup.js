const {Sequelize,DataTypes} = require('sequelize');
require('dotenv').config();

//connecting to postgres
const sequelize = new Sequelize(process.env.DB,process.env.USER,process.env.PASSWORD,{
    host:process.env.HOST,
    dialect:process.env.DIALECT,
    logging:false,
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
});

// first five parameters for PostgreSql connection
// pool is optional => 1. max- max. no of connection in pool, min-min. no of connection in pool
// acquire- maximum time , in milliseconds , that pool will try to get connection before throwing error
// idle- maximum time , in milliseconds , that connection can be idle before being released

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users =  require('./user')(sequelize,DataTypes);

module.exports = db;