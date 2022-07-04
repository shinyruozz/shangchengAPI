const Router = require("koa-router");

const { upload, create, update, destory, restore, findStoreGoods, findAllGoods } = require("../controller/goods");
const { verifyGoods } = require("../middleware/goods");
// const  { hasAdminPermission } =
const { hasAdminPermission } = require("../middleware/common");

const router = new Router({ prefix: "/goods" });
// 上传图片
router.post("/upload", hasAdminPermission, upload);

// 创建商品
router.post("/create", hasAdminPermission, verifyGoods, create);

// 修改商品
router.patch("/:id", hasAdminPermission, update);

//下架商品
router.delete("/:id", hasAdminPermission, destory);

//恢复上架商品
router.patch("/restore/:id", hasAdminPermission, restore);

// 查找商家商品
router.get("/find/:id", findStoreGoods);

//查找所有商品
router.get("/find/", findAllGoods);

module.exports = router;