const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(usr_id) {
    const payload = {
        user: usr_id
    }
    return jwt.sign(payload, process.env.jwt_sec, {expiresIn: 60*60});
}

module.exports = jwtGenerator;