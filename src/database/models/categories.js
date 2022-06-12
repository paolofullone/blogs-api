'use strict';

const CategoriesSchema = (sequelize, DataTypes) => {
  const CategoriesTable = sequelize.define("Category", {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  return CategoriesTable;
};

module.exports = CategoriesSchema;
