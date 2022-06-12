const { authenticateToken } = require('../utils/jwt');

const authenticateMiddleware = async (req, res, next) => {
    console.log('entrou na authenticateMiddleware');
    const token = req.headers.authorization;
    // console.log(token);
    const user = await authenticateToken(token);
    if (!user) {
        const error = { status: 401, message: 'JWT malformed' };
        throw error;
    }
    res.locals.user = user;
    next();
};

module.exports = authenticateMiddleware;