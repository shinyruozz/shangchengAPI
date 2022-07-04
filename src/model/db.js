const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("shangcheng", "root", "admin", {
    host: "localhost",
    dialect: "mysql" /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */ ,
});

sequelize
    .authenticate()
    .then(() => {
        // console.log("链接成功");
    })
    .catch((err) => {
        console.log("链接失败", err);
    });

module.exports = sequelize;