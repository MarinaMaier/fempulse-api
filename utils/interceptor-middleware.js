const jwt = require("jsonwebtoken");
// interceptorMiddleware.js
const interceptorMiddleware = (req, res, next) => {
    // Signup & Login call where token check is not required
    const ignoreTokenCheck = [
        '/signup',
        '/login'
    ]
    // Intercept request
    console.log(`Intercepted request: ${req.method} ${req.originalUrl}`);
    if (ignoreTokenCheck.includes(req.originalUrl)) {
        next();
        return;
    }

    const { authorization } = req.headers;
    try {
        const token = authorization.slice("Bearer ".length)
        jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (error) {
        res.status(401).send(`Error: ${error}`);
    }
  };
  
  module.exports = interceptorMiddleware;
  