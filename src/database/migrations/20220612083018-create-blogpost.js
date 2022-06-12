'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const BlogPostsTable = await queryInterface.createTable('BlogPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // no course além dessas referencias, passou também um field: employee_id que é o nome da PK do employee na representação do banco.
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      published: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
    return BlogPostsTable;
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('BlogPosts');
  },
};
