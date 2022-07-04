const Router = require("koa-router");
const router = new Router();

router.prefix("/user");

//controller
const { userLogin, registerUser, updatePasswd } = require("../controller/user");

//middleware
const { validateUser, encryptPasswd, validateUserInfo } = require("../middleware/user");

//注册
router.post("/register", validateUser, encryptPasswd, registerUser);

//登录
router.post("/login", validateUser, validateUserInfo, userLogin);

//修改密码
router.patch("/updatePasswd", validateUser, validateUserInfo, encryptPasswd, updatePasswd);
module.exports = router;