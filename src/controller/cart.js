const {
    createOrUpdate,
    findCarts,
    updataCart,
    destoryCart,
    changeUserCardSelected,
} = require("../services/cart.service");
const {
    addCartErr,
    updateCartErr,
    findCartErr,
    findNotCartErr,
    destoryCartErr,
    changeAllSelectecErr,
} = require("../config/error");
class CartController {
    async add(ctx) {
        try {
            const userInfo = ctx.state.user;
            const cart = Object.assign({}, ctx.request.body, { user_id: userInfo.id });
            const res = await createOrUpdate(cart);
            ctx.body = {
                code: 0,
                msg: "添加购物车成功",
                result: res,
            };
        } catch (e) {
            ctx.app.emit("error", addCartErr, ctx);
        }
    }

    //查找用户的购物车信息
    async findUserCart(ctx) {
        try {
            const user_id = ctx.request.params.id;
            const res = await findCarts(user_id);

            ctx.body = res;
        } catch (e) {
            ctx.app.emit("error", findCartErr, ctx);
        }
    }

    //修改购物车信息
    async updata(ctx) {
        try {
            const id = ctx.request.params.id;
            const { number, selected } = ctx.request.body;

            const res = await updataCart({ id, number, selected });

            if (res) {
                ctx.body = {
                    code: 0,
                    msg: "修改购物车数据成功",
                    result: "",
                };
            } else {
                ctx.app.emit("error", findNotCartErr, ctx);
            }
        } catch (e) {
            ctx.body = e;
            ctx.app.emit("error", updateCartErr, ctx);
        }
    }

    //删除购物车
    async destory(ctx) {
        try {
            const res = await destoryCart(ids);
            ctx.body = res ? { code: 0, msg: "删除购物车成功", result: res } : destoryCartErr;
        } catch (e) {
            ctx.body = destoryCartErr;
        }
    }

    //全选或者全不选
    async changeAllSelected(ctx) {
        try {
            const id = ctx.request.params.id;
            const selected = ctx.request.body.selected;
            const res = await changeUserCardSelected(id, selected);
            if (res[0] > 0) {
                ctx.body = {
                    code: 0,
                    msg: "修改成功",
                    result: "",
                };
            } else {
                ctx.app.emit("error", changeAllSelectecErr, ctx);
            }
        } catch (e) {
            ctx.app.emit("error", changeAllSelectecErr, ctx);
        }
    }
}

module.exports = new CartController();