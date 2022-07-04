const { GoodsIdErr } = require("../config/error");

const verifyCart = async function(ctx, next) {
    try {
        ctx.verifyParams({
            goods_id: { type: "string", required: true },
            number: { type: "number", required: false },
        });
    } catch (e) {
        console.log(e);
        ctx.app.emit("error", GoodsIdErr, ctx);
        return;
    }

    next();
};

module.exports = {
    verifyCart,
};