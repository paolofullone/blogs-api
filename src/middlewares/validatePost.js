const { getCategories } = require('../services/categoryService');
const { BlogPost, User } = require('../database/models');

const err = { status: 400, message: '"categoryIds" not found' };

const validateExistingCategories = async (categoryIds) => {
    const existingCategories = await getCategories();
    const informedCategoriesIds = existingCategories.map((category) => category.id);
    const categoryIdsExist = categoryIds
        .every((categoryId) => informedCategoriesIds.includes(categoryId));
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
        const errorFields = { status: 400, message: 'Some required fields are missing' };
        throw errorFields;
    }
    try {
        validateCategoryIds(categoryIds);
        validateExistingCategories(categoryIds);        
    } catch (error) {
        return res.status(error.status).json(error);
    }
    next();
};

const validatePostUpdate = async (email, id, body) => {
    const { title, content } = body;

    const postUserEditing = await User.findOne({ where: { email } });
    const postUserAuthor = await BlogPost.findOne({ where: { id } });

    if (postUserEditing.id !== postUserAuthor.userId) {
        const error = { status: 401, message: 'Unauthorized user' };
        throw error;
    }
    await BlogPost.update(
        { title, content, updated: new Date() },
        { where: { id } },
    );
};

module.exports = { validatePost, validatePostUpdate };
