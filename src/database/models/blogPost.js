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
  // o "as" é o que vai aparecer no postman quando fizer a consulta, o post tem um user.
  return blogPostsTable;
};

module.exports = blogPostsSchema;