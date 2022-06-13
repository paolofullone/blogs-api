Como o id ficou autoincrement, no course tem exemplos em que o id é informado na model e tem exemplos que não informa o id na model. Este projeto fiz sem informar o id na model. Mas no req02 pede para informar o id na model User.

Segui a criação das tabelas de acordo com o diagrama e me esqueci que tabela de ligação vem depois da criação da tabela que vai criar a chave que será indicada como foreign key. Ou seja, criei a model e migration da PostsCategories antes de criar a tabela categories, com isso na hora de executar a migration não funcionava.


-x-x-x-x-x-x-x-x

Na aula e no course, quando criou tabela intermediária tipo a PostsCategories passou somente o associate e o Table com o objeto vazio:

  const PostCategoriesTable = sequelize.define('PostCategory', {}, { timestamps: false });

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

// Mas no requisito pediu para informar o postId e o categoryId ficando assim:

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

Das duas formas cria as tabelas, e mesmo desta segunda forma continua não aparecendo as FK's no meu mySQL Workbench (na aba Foreign Keys, os campos aparecem), no beekeper aparece tanto como FK quanto os campos.

-x-x-x-x-x-x-
