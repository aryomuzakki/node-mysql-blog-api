"use strict"

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: {
            args: /^[\a-z0-9_][\a-z0-9_.]{2,30}[\a-z0-9_]$/,
            msg: "username format didn't match. Format: 4 - 32 characters length. Allowed characters are lowercase letters (a-z), digits (0-9), underscores (_) or dots (.). Dot (.) cannot be placed in the beginning or the end of username."
          },
          notEmpty: {
            msg: "username cannot be empty"
          },
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "email cannot be empty"
          },
          isEmail: {
            msg: "email format didn't match"
          },
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "password cannot be empty"
          },
        },
      },
    },
    {
      hooks: {
        afterCreate: (user) => {
          delete user.dataValues.password;
        },
        afterUpdate: (user) => {
          delete user.dataValues.password;
        },
      }
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Post)
  }

  return User;
}