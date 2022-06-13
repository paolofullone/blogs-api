const PostCategoriesSchema = (sequelize, DataTypes) => {
  const PostCategoriesTable = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    }
  }, { timestamps: false });

  PostCategoriesTable.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostCategoriesTable,
      foreignKey: 'categoryId',
      otherKey: 'postId'
    });

    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategoriesTable,
      foreignKey: 'postId',
      otherKey: 'categoryId'
    });

  };
  return PostCategoriesTable;
};

module.exports = PostCategoriesSchema;