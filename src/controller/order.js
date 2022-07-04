const {
    createOrder,
    findAllOrder,
    updateOrderState,
    findUserOrder,
    destoryOrder,
} = require("../services/order.service");
class OrderController {
    async create(ctx) {
        try {
            const user_id = ctx.state.user.id;
            const order_number = Date.now() + "" + Math.floor(Math.random()) * 100;
            const orderParams = Object.assign({}, { user_id, order_number }, ctx.request.body);

            const res = await createOrder(orderParams);
            ctx.body = res;
        } catch (e) {
            ctx.body = e;
        }
    }

    async destory(ctx) {
        const id = ctx.request.params.id;
        const res = await destoryOrder(id);

        if (res) {
            ctx.body = {
                code: 0,
                msg: "删除订单成功",
                res: "",
            };
        }
    }

    async updateState(ctx) {
        const id = ctx.request.params.id;
        const state = ctx.request.body.state;
        const res = await updateOrderState(state, id);
        if (res) {
            ctx.body = {
                code: 0,
                msg: "修改状态成功",
                result: "",
            };
        }
    }

    async findOrder(ctx) {
        const user_id = ctx.state.user.id;
        const res = await findUserOrder(user_id);

        ctx.body = {
            code: 0,
            msg: "查询订单成功",
            result: res,
        };
    }

    async findAll(ctx) {
        const { pageNum, pageSize } = ctx.request.body;
        console.log(pageNum, pageSize);
        const res = await findAllOrder({ pageNum, pageSize });
        ctx.body = {
            code: 0,
            msg: "获取地址成功",
            result: res,
        };
    }
}

module.exports = new OrderController();