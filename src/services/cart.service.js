const Cart = require("../model/cart");
const { Op } = require("sequelize");
const Goods = require("../model/goods");

class CartService {
    async createOrUpdate(cart) {
        let res = await Cart.findOne({
            where: {
                [Op.and]: {
                    goods_id: cart.goods_id,
                    user_id: cart.user_id,
                },
            },
        });
        // 判断是否先存在 如果存在添加数量 没有就创建
        if (res) {
            res.increment({ number: cart.number });

            res.reload();
        } else {
            res = await Cart.create(cart);
        }

        return res;
    }

    // 查找购物车列表
    async findCarts(user_id) {
        const res = await Cart.findAndCountAll({
            where: {
                user_id,
            },
            attributes: ["id", "user_id", "goods_id", "number", "selected"],
            include: {
                model: Goods,
                as: "goods_info",
                attributes: ["id", "goods_name", "goods_price", "goods_num"],
            },
        });

        return res;
    }

    async updataCart({ id, number, selected }) {
        const res = await Cart.findByPk(id);

        if (res) {
            if (number) {
                res.number = number;
            }
            if (selected + "" == "true" || selected + "" == "false") {
                res.selected = selected;
            }
            res.save();
        }

        return res;
    }

    async destoryCart(ids) {
            const res = await Cart.destroy({
                where: {
                    id: {
                        [Op.in]: ids,
                    },
                },
            });
            return res;
        }
        //改变用户购物车全选 或者取消全选状态
    async changeUserCardSelected(id, selected) {
        const res = await Cart.update({
            selected,
        }, {
            where: { user_id: id },
        });

        return res;
    }
}

module.exports = new CartService();