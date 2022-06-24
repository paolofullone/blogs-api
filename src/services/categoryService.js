const { Category } = require('../database/models');

// não achou a findAll

const getCategories = async () => Category.findAll();
    
const getCategory = async (id) => {
    const category = await Category.findByPk(id);
    if (!category) {
        const err = { status: 400, message: '"categoryIds" not found' };
        throw err;
    }
    return category;
};

const createCategory = async (name) => Category.create({ name });
    
module.exports = {
    getCategories,
    createCategory,
    getCategory,
};