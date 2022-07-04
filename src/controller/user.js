const { createUser, updateUserInfo } = require("../services/user.service");
const { registerUniqueErr, registerError } = require("../config/error");
const { SECRET } = require("../config/index");

const jsonwebtoken = require("jsonwebtoken");

class UserController {
    //用户登录
    async userLogin(ctx, next) {
        const result = ctx.request.userInfo;

        ctx.body = {
            code: 0,
            msg: "登录成功",
            token: jsonwebtoken.sign(result, SECRET, { expiresIn: "1d" }),
            result: result,
        };
    }

    //用户注册
    async registerUser(ctx, next) {
        const { password, username, is_admin = false } = ctx.request.body;
        try {
            const res = await createUser({ username, password, is_admin });
            if (res) {
                ctx.body = {
                    code: 0,
                    msg: "注册成功",
                    result: "",
                };
                return;
            }
        } catch (err) {
            if (err.name == "SequelizeUniqueConstraintError") {
                // console.error("err", err);
                ctx.app.emit("error", registerUniqueErr, ctx);
            } else {
                ctx.app.emit("error", registerError, ctx);
            }
        }
    }

    //更该密码
    async updatePasswd(ctx, next) {
        const id = ctx.request.userInfo.id;
        const password = ctx.request.body.new_passwd;
        const res = await updateUserInfo({ password }, { id });
        if (res[0] > 0) {
            ctx.body = {
                code: 0,
                msg: "更改密码成功",
                result: "",
            };
        } else {
            ctx.status = 400;
            ctx.body = {
                code: 0,
                msg: "更改密码失败",
                result: "",
            };
        }
    }
}

module.exports = new UserController();