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
  const blogPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return blogPosts;
};

const getBlogPostById = async (id) => {
  const blogPost = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!blogPost) {
    const err = { status: 404, message: 'Post does not exist' };
    throw err;
  }
  return blogPost;
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
};
