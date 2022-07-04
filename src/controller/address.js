const {
    createAddress,
    updateAddress,
    delAddress,
    findAddress,
    findAllAddr,
} = require("../services/address.service.js");
const { createAddrErr, updateAddrErr, delAddrErr } = require("../config/error");
class AddressController {
    async create(ctx) {
        try {
            const user_id = ctx.state.user.id;
            const address = ctx.request.body;
            const params = Object.assign({}, { user_id }, address);
            const res = await createAddress(params);
            ctx.body = {
                code: 0,
                msg: "创建地址成功",
                result: res,
            };
        } catch (e) {
            ctx.app.emit("error", createAddrErr, ctx);
        }
    }
    async update(ctx) {
        try {
            const id = ctx.request.params.id;
            const user_id = ctx.state.user.id;
            const params = ctx.request.body;

            const res = await updateAddress(user_id, id, params);

            if (res[0]) {
                ctx.body = {
                    code: 0,
                    msg: "修改地址成功",
                    result: "",
                };
            } else {
                ctx.body = updateAddrErr;
            }
        } catch (e) {
            ctx.app.emit("error", updateAddrErr, ctx);
        }
    }

    async findAddr(ctx) {
        const user_id = ctx.state.user.id;
        const res = await findAddress(user_id);
        console.log(ctx.request.params);
        ctx.body = {
            code: 0,
            msg: "查找地址成功",
            result: res,
        };
    }

    async remove(ctx) {
        try {
            const id = ctx.request.params.id;
            const res = await delAddress(id);

            ctx.body = {
                code: 0,
                msg: "删除地址成功",
                result: res,
            };
        } catch (e) {
            ctx.app.emit("error", delAddrErr, ctx);
        }
    }

    async findAll(ctx) {
        const { pageNum, pageSize } = ctx.request.body;
        const res = await findAllAddr(pageNum, pageSize);
        ctx.body = {
            code: 0,
            msg: "查找地址信息成功",
            result: res,
        };
    }

    // async updateDefa
}

module.exports = new AddressController();