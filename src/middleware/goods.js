const { notAdminErr, addGoodErr, loginUserErr } = require("../config/error");

const { getUserInfo } = require("../services/user.service");

//判断管理员权限
const hasAdminPermission = async(ctx, next) => {
    const userInfo = ctx.state.user;
    const res = await getUserInfo({ id: ctx.request.body.store_user_id });
    //判断是否有该用户
    if (!res) {
        ctx.app.emit("error", loginUserErr, ctx);
        return;
    }
    if (!userInfo.is_admin) {
        ctx.body = notAdminErr;
        return;
    }

    await next();
};

//验证商品传递数据
const verifyGoods = async(ctx, next) => {
    try {
        ctx.verifyParams({
            // store_user_id: { required: true },

            goods_name: { type: "string", required: true },
            goods_price: { type: "number", required: true },
            goods_num: { type: "number", required: true },
            goods_img: { type: "string", required: false },
        });
    } catch (e) {
        ctx.body = addGoodErr;
        return;
    }

    await next();
};

module.exports = {
    hasAdminPermission,
    verifyGoods,
};