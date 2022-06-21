'use strict';

const CategoriesSchema = (sequelize, DataTypes) => {
  const CategoriesTable = sequelize.define("Category", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  });
  return CategoriesTable;
};

module.exports = CategoriesSchema;
