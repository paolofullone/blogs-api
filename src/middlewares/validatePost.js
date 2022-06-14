const { getCategories } = require('../services/categoryService');

const err = {
    status: 400,
    message: '"categoryIds" not found',
};

const validateExistingCategoryIds = async (categoryIds) => {
    const categories = await getCategories();
    const categoryIdsExist = categoryIds
        .every((categoryId) => categories.some((category) => category.id === categoryId));
    if (!categoryIdsExist) {
        return err;
    }
};

const validateCategoryIds = async (categoryIds) => {
    if (!Array.isArray(categoryIds) || !categoryIds.length > 0) throw err;
};

const validatePost = (req, res, next) => {
    const { title, content, categoryIds } = req.body;
    if (!title || !content || !categoryIds) {
        const errorFields = {
            status: 400,
            message: 'Some required fields are missing',
        };
        throw errorFields;
    }
    try {
        validateCategoryIds(categoryIds);
        validateExistingCategoryIds(categoryIds);        
    } catch (error) {
        return res.status(error.status).json(error);
    }

    next();
};

module.exports = validatePost;
