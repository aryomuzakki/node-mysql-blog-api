const { Op } = require("sequelize");
const { User } = require("../models");
const { compareSync } = require("bcryptjs");

const registerUser = async (req, res) => {
  console.log(req.body)
  try {
    const { username, email, password } = req.body;

    let requiredFields = "";

    Object.entries({
      username,
      email,
      password
    }).forEach(([key, value], idx) => {
      console.log(value)
      if (!value) {
        requiredFields += `${key}, `;
      }
    });

    if (requiredFields !== "") {
      return res.status(400).send({ message: `${requiredFields}must be provided` });
    }

    const newUser = await User.create({
      username,
      email,
      password
    });

    if (!newUser) {
      throw new Error("Failed creating new user");
    }

    return res.send({ message: "new user has been created", data: newUser });

  } catch (error) {
    if (["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(error.name)) {
      const errorFieldList = {};
      let errFields = "";
      error?.errors?.map(err => {
        errorFieldList[err.path] = err.message;
        errFields += ` ${err.path}`;
      })
      // console.log(errorFieldList);
      return res.status(400).send({ message: `Error validation of${errFields}`, errorField: errorFieldList, error });
    }
    return res.status(500).send({ message: error.message, error });
  }
}

const loginUser = async (req, res) => {
  try {

    const { username, email, password } = req.body;

    if (!username || !email) {
      return res.status(400).send({ message: `username or email must be provided` });
    }

    const user = await User.findOne({
      where: {
        ...username ? { username } : { email },
      }
    })

    if (!user) {
      return res.status(404).send({ message: `${username || email} not Found` });
    }

    if (!compareSync(password, user.password)) {
      return res.status(400).send({ message: `account credentials not match` });
    }

    // sign a jwt

    return res.send({ message: "success login" });
  } catch (error) {
    return res.status(500).send({ message: error.message, error });
  }
}

const getUsers = async (req, res) => {
  try {
    const limit = req.params?.limit || 10;
    const offset = req.params?.offset || ((req.params?.page || 1) - 1) * limit;
    const { count, rows: users } = await User.findAndCountAll();

    return res.send({
      data: users,
      metadata: {
        offset,
        limit,
        currentRows: users.length,
        totalRows: count,
      }
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, error });
  }
}

module.exports = {
  getUsers,
  registerUser,
  loginUser,
}