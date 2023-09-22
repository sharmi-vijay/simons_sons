const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const jwtAuthChecker = (request, response, next) => {
    const token = request.header("Auth-token");
    if(!token) {
        response.send("Auth error occured!")
    } else {
        jwt.verify(token, secretKey, (error, authData)=> {
            if(error) {
                response.send("Invalid token!")
            } else {
                request = authData;
                next();
            }
        });
    }

    
}

module.exports = jwtAuthChecker;