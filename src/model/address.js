const { DataTypes } = require("sequelize");
const sequelize = require("../model/db");

const Address = sequelize.define(
    "Address", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "用户id",
        },
        consignee: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "收货人",
        },
        phone: {
            type: DataTypes.CHAR(11),
            allowNull: false,
            comment: "收货人手机号码",
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "收货人地址",
        },
        is_default: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        timestamps: true,
    }
);

// Address.sync({ force: true });

module.exports = Address;