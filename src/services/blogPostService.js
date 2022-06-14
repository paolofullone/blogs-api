const jwt = require('jsonwebtoken');
const { BlogPost } = require('../database/models');
const { sequelize } = require('../database/models');
const { User, Category } = require('../database/models');

const getUser = async (user) => {
  const result = jwt.verify(user, process.env.JWT_SECRET);
  const { email } = result;
  const userSearched = await User.findOne({ where: { email } });
  return userSearched.dataValues.id;
};

const createBlogPost = async (user, { title, content, categoryIds }) => {
  try {
    const userSearchedId = await getUser(user);
    const result = await sequelize.transaction(async (t) => {
      const blogPost = await BlogPost.create({
        title,
        content,
        userId: userSearchedId,
        published: new Date(),
        updated: new Date(),
      }, { transaction: t });
      await blogPost.addCategories(categoryIds, { transaction: t });
      return blogPost;
    });
    return result;
  } catch (error) {
    const err = { status: 400, message: '"categoryIds" not found' };
    throw err;
  }
};

const getAllBlogPosts = async () => {
  console.log('entrou na blogPostService');
  const blogPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  console.log('blogPosts', blogPosts);
  return blogPosts;
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
};
