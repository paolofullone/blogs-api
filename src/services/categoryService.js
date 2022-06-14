const { Category } = require('../database/models');

// não achou a findAll

const getCategories = async () => {
    const categories = await Category.findAll();
    return categories;
};

const getCategory = async (id) => {
    const category = await Category.findByPk(id);
    if (!category) {
        const err = {
            status: 400,
            message: '"categoryIds" not found',
        };
        throw err;
    }
    return category;
};

const createCategory = async (name) => {
    const category = await Category.create({ name });
    return category;
};

module.exports = {
    getCategories,
    createCategory,
    getCategory,
};