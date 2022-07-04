const Router = require("koa-router");
const router = new Router({ prefix: "/address" });

const { paramsError } = require("../config/error");

const { create, update, remove, findAddr, findAll } = require("../controller/address");
require("../model/address");

const { validateParams } = require("../middleware/common");

//创建地址
router.post(
    "/",
    validateParams({
            consignee: "string",
            address: "string",
            phone: { type: "string", format: /^1[3|4|5|6|7|8|9][0-9]{9}$/ },
        },
        paramsError
    ),
    create
);

//获取用户地址
router.get("/:id", findAddr);

//修改地址
router.patch(
    "/:id",
    validateParams({
            consignee: { type: "string", required: false },
            address: { type: "string", required: false },
            phone: { type: "string", format: /^1[3|4|5|6|7|8|9][0-9]{9}$/, required: false },
            is_default: { type: "boolean", required: false },
        },
        paramsError
    ),
    update
);

//删除地址
router.delete("/:id", remove);

router.get("/find/all", findAll);
module.exports = router;