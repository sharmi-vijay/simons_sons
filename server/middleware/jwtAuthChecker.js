const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

const jwtAuthChecker = (request, response, next) => {
    const token = request.header("Auth-token");

    if (!token) {
        return response.status(401).json({ message: "Access denied! No token provided." });
    }

    jwt.verify(token, secretKey, (error, authData) => {
        if (error) {
            return response.status(403).json({ message: "Invalid token!" });
        }

        request.user = authData;  // Attach user data to request
        next();
    });
};

module.exports = jwtAuthChecker;
