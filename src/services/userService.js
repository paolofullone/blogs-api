const { User } = require('../database/models');
const { getUserId } = require('../utils/getUserId');
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

const createUser = async ({ displayName, email, password, image }) => {
    const UserExists = await User.findOne({ where: { email } });
    if (UserExists) {
        const error = { status: 409, message: 'User already registered' };
        throw error;
    }
    await User.create({ displayName, email, password, image });
    const token = generateJWTToken(email, password);
    return token;
};

const getUsers = async () => {
    const users = await User.findAll({
        attributes: { exclude: ['password'] },
    });
    return users;
};

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

const deleteUser = async (user) => {
    const { email, password } = user;
    const token = await getUserByEmail(email, password);
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