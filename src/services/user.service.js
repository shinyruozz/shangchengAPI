const User = require("../model/user");

class UserService {
    async createUser({ username, password, is_admin }) {
        const res = await User.create({
            username,
            password,
            is_admin,
        });
        return res;
    }

    async getUserInfo({ id, username, password }) {
        const findObj = {};
        id && Object.assign(findObj, { id });
        username && Object.assign(findObj, { username });
        password && Object.assign(findObj, { password });

        const res = await User.findOne({ where: findObj });
        return res ? res.dataValues : null;
    }

    async updateUserInfo(data, { username, password, is_admin }) {
        const findObj = {};
        username && Object.assign(findObj, { username });
        password && Object.assign(findObj, { password });
        is_admin && Object.assign(findObj, { is_admin });

        const res = await User.update(data, { where: findObj });
        return res;
    }
}

module.exports = new UserService();