"use strict"

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "title cannot be empty"
          },
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "body cannot be empty"
          },
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id'
        },
      },
    },
  );

  Post.associate = (models) => {
    Post.belongsTo(models.User);
  }

  return Post;
}