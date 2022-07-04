const Goods = require("../model/goods");
class GoodsService {
    async createGoods(goods) {
        const res = await Goods.create(goods);
        return res;
    }
    async updateGoods(id, goods) {
        const res = await Goods.update(goods, { where: { id } });
        return res[0] > 0 ? true : false;
    }

    async distoryGoods(id) {
        const res = await Goods.destroy({
            where: {
                id,
            },
        });
        return res;
    }

    async restoreGoods(id) {
        const res = await Goods.restore({
            where: {
                id,
            },
        });
        return res;
    }

    //查找商品
    async findGoods(find, { pageSize = 10, pageNum = 1 }) {
        pageSize = Number(pageSize);
        const offset = (pageNum - 1) * pageSize;

        const total = await Goods.count();

        const { count, rows } = await Goods.findAndCountAll({
            offset,
            limit: pageSize,
            where: find,
        });
        return {
            pageNum,
            pageSize,
            total,
            count,
            list: rows,
        };
    }
}

module.exports = new GoodsService();