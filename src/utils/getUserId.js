const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const getUserId = async (user) => {
    const result = jwt.verify(user, process.env.JWT_SECRET);
    const { email } = result;
    const userSearched = await User.findOne({ where: { email } });
    return userSearched.dataValues.id;
};

module.exports = {
    getUserId,
};