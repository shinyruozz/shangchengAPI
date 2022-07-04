const fs = require("fs");
const path = require("path");
const Router = require("koa-router");

const router = new Router();

const files = fs.readdirSync(path.join(__dirname));

files.forEach((fileName) => {
    const pathStr = path.join(__dirname, fileName);
    const res = fs.statSync(pathStr).isFile();
    if (res && fileName != "index.js") {
        const r = require(pathStr);
        router.use(r.routes());
    }
});

module.exports = router;