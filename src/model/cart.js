const { DataTypes } = require("sequelize");
const sequelize = require("../model/db");
const Goods = require("./goods");

const Cart = sequelize.define(
    "Cart", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "用户id",
        },
        goods_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "商品id",
        },
        number: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            comment: "数量",
        },
        selected: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            comment: "是否选中状态",
        },
    }, {
        timestamps: true,
        paranoid: true,
    }
);

Cart.belongsTo(Goods, { foreignKey: "goods_id", as: "goods_info" });

// Cart.sync({ force: true });

module.exports = Cart;