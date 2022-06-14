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

-x-x-x-x-x-x-x-x-x-x-x-x-x--x-x-x-x-x-x--x-x-x-x-x-x--x-x-x-x-x-x--x-x-x-x-x-x--x-x-x-x-x-x-

No req12, criei a validatePost que chama a validateCategoryIds e a ValidateExistingCategoryIds.
Fiquei um bom tempo fazendo o caminho de chamar a ValidateCategoryIds e ela chamar a ValidateExistingCategoryIds e sempre caía no erro de:

[UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "#<Object>".] {
  code: 'ERR_UNHANDLED_REJECTION'

Só consegui resolver passando um try/catch englobando a validateCategoryIds e ValidateExistingCategoryIds, capturando o erro e retornando o erro para a Service e fazendo o throw dentro de outro try/catch na service.

Dentro da ValidatePost, pude fazer o throw do erro dentro da validateCategoryIds, mmas não aceitou passar o erro dentro da validateCategoryIds.

Primeiro havia tentado resolver com Promise.All e passando um every  retornando um booleano para verificar se todos os ids informados existiam nos ids das categorias, achei que era este o problema, fiz um array com os id's das categorias e outro com o do objeto informado e o problema persistiu, por fim resolvi com os 2 try/catchs.


-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x

Para o req 13, a sintaxe para excluir um campo (password), é um pouco diferente da sintaxe das categorys, que traz todas as informações, não consegui fazer a exclusão usando o through, fiz sem o through na base da tentativa e erro.

      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },

-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x