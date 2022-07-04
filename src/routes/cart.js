const Router = require("koa-router");

const { add, findUserCart, updata, destory, changeAllSelected } = require("../controller/cart.js");
const { hasAdminPermission } = require("../middleware/common");
const router = new Router({ prefix: "/cart" });

//添加购物车
router.post("/add", add);
//获取用户购物车信息
router.get("/:id", findUserCart);
// 修改购物车信息
router.patch("/:id", updata);

//删除购物车
router.delete("/", destory);

//购物车 全选或取消
router.patch("/all/:id", changeAllSelected);

module.exports = router;