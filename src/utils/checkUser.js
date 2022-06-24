const bcrypt = require('bcrypt');
const { generateJWTToken } = require('./jwt');

const checkUser = async (email, password, passwordHash) => {
    const match = await bcrypt.compare(password, passwordHash);

    if (match) {
        return generateJWTToken(email);
    }
    const error = { status: 401, message: 'Password do not match, please try again.' };
    throw error;
};

module.exports = {
    checkUser,
};