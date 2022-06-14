const jwt = require('jsonwebtoken');
const { BlogPost } = require('../database/models');
const { sequelize } = require('../database/models');
const { User } = require('../database/models');

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

module.exports = {
  createBlogPost,
};
