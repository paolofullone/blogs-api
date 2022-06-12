'use strict';

const UserSchema = (sequelize, DataTypes) => {
  const UserTable = sequelize.define("User", {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  return UserTable;
};

module.exports = UserSchema;
