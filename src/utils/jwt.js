const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtConfig = {
    expiresIn: '15m',
    algorithm: 'HS256',
};
const generateJWTToken = ({ email, password }) =>
    jwt.sign({ email, password }, JWT_SECRET, jwtConfig);

module.exports = {
    generateJWTToken,
};
