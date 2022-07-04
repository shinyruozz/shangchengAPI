const app = require("./app");
const { APP_PORT } = require("./config/index");

app.listen(8080, () => {
    console.log("localhost8080");
});