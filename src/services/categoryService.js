const { Category } = require('../database/models');

// não achou a findAll

const getCategories = async () => {
    const categories = await Category.findAll();
    console.log(categories);
    return categories;
};

const createCategory = async (name) => {
    const category = await Category.create({ name });
    return category;
};

module.exports = {
    getCategories,
    createCategory,
};