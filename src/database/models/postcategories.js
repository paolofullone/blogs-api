const PostCategoriesSchema = (sequelize, DataTypes) => {
  const PostCategoriesTable = sequelize.define('PostCategory', {}, { timestamps: false });

  PostCategoriesTable.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategoriesTable,
      foreignKey: 'postId',
      otherKey: 'categoryId'
    });

    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostCategoriesTable,
      foreignKey: 'categoryId',
      otherKey: 'postId'
    });
  };
  return PostCategoriesTable;
};

module.exports = PostCategoriesSchema;