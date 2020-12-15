function logger(req, res, next) {
    console.log(`middleware___logger ${req.originalUrl}`);
    next()
}


module.exports = {logger};