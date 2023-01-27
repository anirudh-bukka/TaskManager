const asyncWrapper = (fn) => {
    // `fn` is a controller as an argument.

    /* We are invoking the async wrapper right away. We pass req, res, next down to the function (the controller) and we wrap the controller in the middleware
    And the way we do that is, we return another function since we use await inside the function body. */
    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch(error) {
            next(error) // We will catch errors here and pass it to a next set of middleware
        }
    }
}

module.exports = asyncWrapper