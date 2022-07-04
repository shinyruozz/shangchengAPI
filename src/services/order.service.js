const Order = require("../model/order");
class OrderService {
    async createOrder(params) {
        return await Order.create(params);
    }
    async destoryOrder(id) {
        return await Order.destroy({ where: { id } });
    }

    async updateOrderState(state, id) {
        return await Order.update({ state }, { where: { id } });
    }
    async findUserOrder(id) {
        const { count, rows } = await Order.findAndCountAll({ where: { id } });
        return { count, list: rows };
    }

    async findAllOrder({ pageSize, pageNum }) {
        const offset = (pageNum - 1) * pageSize;
        pageSize = Number(pageSize);
        const { count, rows } = await Order.findAndCountAll({
            offset,
            limit: pageSize,
        });
        return {
            count,
            list: rows,
        };
    }
}

module.exports = new OrderService();