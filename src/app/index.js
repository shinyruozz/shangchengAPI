const path = require("path");

const Koa = require("koa");
const koaBody = require("koa-body");
const { SECRET } = require("../config/index");
const koaJwt = require("koa-jwt");
const koaParameter = require("koa-parameter");

const errorHandler = require("./errorHandler");
// const userRouter = require("../routes/user");
const router = require("../routes/index");

const app = new Koa();

// token 错误处理中间件
app.use(function(ctx, next) {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = {
                error: err.originalError ? err.originalError.message : err.message,
            };
        } else {
            throw err;
        }
    });
});
//token 认证
app.use(koaJwt({ secret: SECRET }).unless({ path: [/^\/user\/(login|register)/, /^\/goods\/find/] }));
app.use(
    koaBody({
        multipart: true,
        formidable: {
            uploadDir: path.join(__dirname, "../upload"),
            keepExtensions: true,
        },
        parsedMethods: ["POST", "PUT", "PATCH", "DELETE", "GET"],
    })
);

app.use(koaParameter(app));

app.use(router.routes());

//错误处理
app.on("error", errorHandler);

module.exports = app;