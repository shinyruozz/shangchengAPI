const { createGoods, updateGoods, distoryGoods, restoreGoods, findGoods } = require("../services/goods.service");
const { createGoodErr, updataGoodErr, destoryGoodsErr, restoreGoodsErr, findGoodsErr } = require("../config/error");

class GoodsController {
    async upload(ctx) {
        const { filepath } = ctx.request.files.file;

        ctx.body = {
            code: 0,
            msg: "上传图片成功",
            result: {
                goods_img: filepath,
            },
        };
    }

    async create(ctx) {
        try {
            // const { goods_name, goods_price, goods_num, goods_img } = ctx.request.body;
            const res = await createGoods(ctx.request.body);
            ctx.body = {
                code: 0,
                msg: "创建商品成功",
                result: "",
            };
        } catch (e) {
            console.log(e);
            ctx.app.emit("error", createGoodErr, ctx);
        }
    }

    async update(ctx) {
        try {
            const id = ctx.request.params.id;

            const res = await updateGoods(id - 0, ctx.request.body);
            if (res) {
                ctx.body = {
                    code: 0,
                    msg: "修改商品成功",
                    result: "",
                };
            } else {
                ctx.body = updataGoodErr;
            }
        } catch (e) {
            console.log(e);
            ctx.body = updataGoodErr;
        }
    }

    //下架删除商品
    async destory(ctx) {
            try {
                const id = ctx.request.params.id;
                const res = await distoryGoods(id - 0);
                if (res > 0) {
                    ctx.body = {
                        code: 0,
                        msg: "删除商品成功",
                        result: "",
                    };
                } else {
                    ctx.body = destoryGoodsErr;
                }
            } catch (e) {
                ctx.app.emit("error", destoryGoodsErr, ctx);
            }
        }
        //上架恢复商品
    async restore(ctx) {
        try {
            const id = ctx.request.params.id;
            const res = await restoreGoods(id - 0);
            if (res > 0) {
                ctx.body = {
                    code: 0,
                    msg: "上架恢复商品成功",
                    result: "",
                };
            } else {
                ctx.body = restoreGoodsErr;
            }
        } catch (e) {
            ctx.app.emit("error", restoreGoodsErr, ctx);
        }
    }

    //查询店铺商品
    async findStoreGoods(ctx) {
        const id = Number(ctx.request.params.id);
        const { pageNum, pageSize } = ctx.request.body;
        const res = await findGoods({ store_user_id: id }, { pageNum, pageSize });

        ctx.body = {
            code: 0,
            msg: "查找成功",
            result: res,
        };
    }

    //查找商品
    async findAllGoods(ctx) {
        try {
            const { pageNum = 1, pageSize = 10 } = ctx.request.params;

            const res = await findGoods({}, { pageNum, pageSize });

            ctx.body = {
                code: 0,
                msg: "查找成功",
                result: res,
            };
        } catch (e) {
            ctx.app.emit("error", findGoodsErr, ctx);
        }
    }
}

module.exports = new GoodsController();