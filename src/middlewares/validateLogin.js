const validateLogin = (req, _res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        const error = { status: 400, message: 'Some required fields are missing' };
        throw error;
    }
    next();
};

module.exports = validateLogin;