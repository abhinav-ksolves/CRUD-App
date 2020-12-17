module.exports = (sequelize,DataTypes)=>{
    const User = sequelize.define("User",{
                 firstName:{
                     type:DataTypes.STRING,
                     allowNull:false
                 },
                 lastName:{
                     type:DataTypes.STRING
                 },
                 salary:{
                     type:DataTypes.INTEGER,
                     allowNull:false
                 }
    });
    return User;
}