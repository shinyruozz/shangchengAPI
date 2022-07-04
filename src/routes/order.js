const Router = require("koa-router");

const router = new Router({ prefix: "/order" });

const { create, updateState, findOrder, destory, findAll } = require("../controller/order");
const { hasAdminPermission } = require("../middleware/common");
//查询用户订单
router.get("/", findOrder);
router.delete("/:id", destory);
router.patch("/:id", updateState);
router.post("/", create);
router.get("/all", hasAdminPermission, findAll);

module.exports = router;