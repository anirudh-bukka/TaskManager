const errorHandlerMiddleware = (err, req, res, next) => {
    return res.status(500).json({ msg: err })
} // this 'err' is the error that is coming from the asyncWrapper.

module.exports = errorHandlerMiddleware