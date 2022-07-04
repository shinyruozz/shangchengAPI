const { DataTypes } = require("sequelize");
const sequelize = require("../model/db");

const Order = sequelize.define(
    "Order", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "用户id",
        },
        address_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "地址id",
        },
        goods_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "商品id",
        },

        order_info: {
            type: DataTypes.STRING,
            comment: "订单信息",
        },
        total: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            comment: "商品总价",
        },
        order_number: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            comment: "唯一订单标识",
        },
        state: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
            allowNull: false,
            comment: "订单状态(0:未支付,1:已支付,2:已发货,3:已签收,4:取消)",
        },
    }, {
        timestamps: true,
        paranoid: true,
    }
);

// Order.sync({ force: true });

module.exports = Order;