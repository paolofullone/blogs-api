const { Op } = require('sequelize');
const { User, Category, BlogPost, sequelize } = require('../database/models');
const { validatePostUpdate } = require('../middlewares/validatePost');
const { getUserId } = require('../utils/getUserId');

const getUser = async (token) => getUserId(token);

const createBlogPost = async (token, { title, content, categoryIds }) => {
  try {
    const userSearchedId = await getUser(token);
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

const updateBlogPost = async (email, id, body) => {
  const { title, content } = body;
  if (!title || !content) {
    const err = { status: 400, message: 'Some required fields are missing' };
    throw err;
  }

  await validatePostUpdate(email, id, body);

  const result = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return result;
};

const deleteBlogPost = async (email, id) => {
  const userDeleting = await User.findOne({ where: { email } });
  const blogPost = await BlogPost.findOne({ where: { id } });
  
  if (!blogPost) {
    const err = { status: 404, message: 'Post does not exist' };
    throw err;
  }

  if (blogPost.userId !== userDeleting.dataValues.id) {
    const err = { status: 401, message: 'Unauthorized user' };
    throw err;
  }

  await blogPost.destroy();
};

const getBlogPostsBySearch = async (q) => {
  if (!q) {
    return getAllBlogPosts();
  }
  const blogPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { content: { [Op.like]: `%${q}%` } },
      ],
    },
  });
  if (!blogPosts) return [];
  return blogPosts;
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
  getBlogPostsBySearch,
};
