const errorHandler = async(err, ctx) => {
    ctx.status = 400;
    ctx.body = err;
};

module.exports = errorHandler;