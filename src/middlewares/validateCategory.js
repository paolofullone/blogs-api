const validateCategory = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        const error = { status: 400, message: '"name" is required' };
        throw error;
    }
    next();
};

module.exports = validateCategory;