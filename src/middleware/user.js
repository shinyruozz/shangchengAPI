const bcrypt = require("bcryptjs");
const { getUserInfo } = require("../services/user.service");
const { loginUserErr, loginError, loginValidateError } = require("../config/error");

class userMiddleware {
    //验证用户输入格式
    async validateUser(ctx, next) {
        const { username, password, new_passwd } = ctx.request.body;
        if (!(username.length >= 2 && username.length <= 14) || !(password.length >= 6 && password.length <= 16)) {
            ctx.status = 400;
            ctx.body = {
                code: 10000,
                mas: "用户输入格式不正确",
                result: "",
            };
            return;
        }

        if (new_passwd && !(new_passwd.length >= 6 && new_passwd.length <= 16)) {
            ctx.status = 400;
            ctx.body = {
                code: 10000,
                mas: "新密码输入格式不正确",
                result: "",
            };
            return;
        }
        await next();
    }

    async encryptPasswd(ctx, next) {
        const salt = bcrypt.genSaltSync(10);
        if (!ctx.request.body.new_passwd) {
            ctx.request.body.password = bcrypt.hashSync(ctx.request.body.password, salt);
        } else {
            ctx.request.body.new_passwd = bcrypt.hashSync(ctx.request.body.new_passwd, salt);
        }
        await next();
    }

    async validateUserInfo(ctx, next) {
        const { username, password } = ctx.request.body;
        try {
            // 查找账户
            const result = await getUserInfo({ username });
            if (!result) {
                ctx.status = 400;
                ctx.body = loginUserErr;
                return;
            }
            //比对密码
            const compare = bcrypt.compareSync(password, result.password);
            if (compare) {
                const { password, ...res } = result;
                ctx.request.userInfo = res;
                await next();
            } else {
                ctx.body = loginValidateError;
            }
        } catch (e) {
            console.log(e);
            ctx.app.emit("error", loginError, ctx);
        }
    }

    //判断管理员权限
    async hasAdminPermission(ctx, next) {
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
    }
}
module.exports = new userMiddleware();