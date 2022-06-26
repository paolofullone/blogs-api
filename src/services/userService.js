const bcrypt = require('bcrypt');
const { User } = require('../database/models');
const { getUserId } = require('../utils/getUserId');
const { generateJWTToken } = require('../utils/jwt');
const { checkUser } = require('../utils/checkUser');

const getUserByEmail = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        const error = { status: 400, message: 'Invalid fields' };
        throw error;
    }
    return checkUser(email, password, user.password);
};
const createUser = async ({ displayName, email, password, image }) => {
    const UserExists = await User.findOne({ where: { email } });
    if (UserExists) {
        const error = { status: 409, message: 'User already registered' };
        throw error;
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    await User.create({ displayName, email, password: hash, image });
    return generateJWTToken(email);
};

const getUsers = async () => User.findAll({ attributes: { exclude: ['password'] } });

const getUserById = async (id) => {
    const user = await User.findOne({
        where: { id },
        attributes: { exclude: ['password'] },
    });
    if (!user) {
        const error = { status: 404, message: 'User does not exist' };
        throw error;
    }
    return user;
};

const deleteUser = async ({ email }) => {
    const token = await getUserByEmail(email);
    const id = await getUserId(token);
    await User.destroy({ where: { id } });
};

module.exports = {
    getUserByEmail,
    createUser,
    getUsers,
    getUserById,
    deleteUser,
};