const { DataTypes } = require("sequelize");
const sequelize = require("../model/db");

const User = sequelize.define(
    "User", {
        // 在这里定义模型属性
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        timestamps: true,
    }
);
// User.sync();

module.exports = User;