'use strict';

const blogPostsSchema = (sequelize, DataTypes) => {
  const blogPostsTable = sequelize.define("BlogPost", {
    title: sequelize.STRING,
    content: Sequelize.STRING,
    published: Sequelize.DATE,
    updated: sequelize.DATE,
  }, {
    timestamps: false,
  });

  blogPostsTable.associate = (models) => {
    blogPostsTable.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };

  return blogPostsTable;
};

module.exports = blogPostsSchema;