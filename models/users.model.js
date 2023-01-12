const dbConfig = require("../config/db.config");

const {
    Sequelize,
    Model,
    DataTypes
} = require("sequelize");
const sequelize = new Sequelize.Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect
});

class User extends Model {};

User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    photo: DataTypes.BLOB,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    description: DataTypes.STRING,
    birthDay: DataTypes.DATE,
    college: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    score: DataTypes.FLOAT
}, {
    sequelize,
    modelName: "user",
});

sequelize.sync().then().catch(error => {
    console.log("ERROR SYNC MODEL USER: " + error);
});

exports.User = User;