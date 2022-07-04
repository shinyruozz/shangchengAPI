const Address = require("../model/address");
class AddressService {
    async createAddress(params) {
        return await Address.create(params);
    }
    async updateAddress(user_id, id, params) {
        //如果修改默认
        if (params.is_default) {
            await Address.update({ is_default: false }, { where: { user_id } });
        }

        return await Address.update(params, { where: { id } });
    }

    async delAddress(id) {
        return await Address.destroy({ where: { id } });
    }

    //查找用户地址信息
    async findAddress(user_id) {
        const { count, rows } = await Address.findAndCountAll({ where: { user_id } });

        return {
            count,
            list: rows,
        };
    }

    //查找所有
    async findAllAddr(pageNum = 1, pageSize = 10) {
        pageSize = Number(pageSize);

        const offset = (pageNum - 1) * pageSize;
        const { count, rows } = await Address.findAndCountAll({
            offset,
            limit: pageSize,
        });

        // return await Address.findAll({ offset });

        return {
            total: count,
            list: rows,
        };
    }
}

module.exports = new AddressService();