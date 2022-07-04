const { loginUserErr, notAdminErr } = require("../config/error");
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

//验证参数格式
const validateParams = (rules, errorResult) => {
    return async function(ctx, next) {
        try {
            ctx.verifyParams(rules);
        } catch (e) {
            console.log(e);
            return ctx.app.emit("error", errorResult, ctx);
        }

        await next();
    };
};

module.exports = {
    hasAdminPermission,
    validateParams,
};