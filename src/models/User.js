"use strict"

const { hashSync } = require("bcryptjs");

// const userModel
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          // is: {
          //   args: /^[\a-z0-9_][\a-z0-9_.]+[\a-z0-9_]+$/,
          //   msg: "username cannot started and ended with dot (.). username must only consists of any of these character: lowercase letters (a-z) or digits (0-9) or underscored (_) or dot (.)"
          // },
          // notEmpty: {
          //   msg: "username cannot be empty"
          // },
          is: /^[\a-z0-9_][\a-z0-9_.]+[\a-z0-9_]+$/,
          notEmpty: true,
          len: [4, 32],
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          // notEmpty: {
          //   msg: "email cannot be empty"
          // },
          // isEmail: {
          //   msg: "must be an email format"
          // },
          notEmpty: true,
          isEmail: true,
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          console.log("inside models")
          console.log("value: ", value);
          console.log("this username: ", this.username);
          console.log("this email: ", this.email);
          if (value === "") {
            throw new Error("password cannot be empty")
          }

          try {
            console.log("hashed: ", hashSync(value))
            // console.log("hashed with salt determined: ", hashSync(value, process.env.APP_SECRET))

            this.setDataValue('password', hashSync(value));

          } catch (error) {
            console.log("an error when setting password in models set: ")
            console.log(error.message)
          }
        }
      },
    },
    {
      hooks: {
        afterCreate: (record) => {
          delete record.dataValues.password;
        },
        afterUpdate: (record) => {
          delete record.dataValues.password;
        },
      }
    }
  );

  User.associate = (models) => {
    // models.
  }

  return User;
}

// module.exports = userModel;