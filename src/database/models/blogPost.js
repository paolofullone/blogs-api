'use strict';

const blogPostsSchema = (sequelize, DataTypes) => {
  const blogPostsTable = sequelize.define("BlogPost", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    timestamps: false,
  });

  blogPostsTable.associate = (models) => {
    blogPostsTable.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };
  return blogPostsTable;
};

module.exports = blogPostsSchema;