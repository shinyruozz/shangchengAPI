const { DataTypes } = require("sequelize");
const sequelize = require("../model/db");

const Goods = sequelize.define(
    "Goods", {
        store_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "商家id",
        },
        // 在这里定义模型属性
        goods_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        goods_price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        goods_num: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        goods_img: {
            type: DataTypes.STRING,

            set: function(val) {
                return this.setDataValue("goods_img", JSON.stringify(val));
            },
        },
    }, {
        timestamps: true,
        paranoid: true,
    }
);
// Goods.sync({ force: true });

module.exports = Goods;