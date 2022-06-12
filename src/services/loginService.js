const { User } = require('../database/models');
const { generateJWTToken } = require('../utils/jwt');

const getUserByEmail = async (email, password) => {
    const user = await User.findOne({ where: { email, password } });
    if (!user) {
        const error = { status: 400, message: 'Invalid fields' };
        throw error;
    }
    const token = generateJWTToken(email, password);
    return token;
};

module.exports = {
    getUserByEmail,
};