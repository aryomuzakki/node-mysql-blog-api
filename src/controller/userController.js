const { User, Post } = require("../models");
const { compareSync, hashSync } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sequelizeErrorHandler, validateRequiredFields, validatePassword } = require("../lib");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    validateRequiredFields({ username, email, password });

    validatePassword(password);

    const newUser = await User.create({
      username,
      email,
      password: hashSync(password),
    });

    if (!newUser) {
      throw new Error("Failed creating new user");
    }

    return res.status(201).send({ message: "new user has been created", data: newUser });

  } catch (error) {
    return sequelizeErrorHandler(error, { res }) || res.status(error.statusCode || 500).send({ message: error.message, error });
  }
}

const loginUser = async (req, res) => {
  try {

    const { username, email, password } = req.body;

    if (!username && !email) {
      return res.status(400).send({ message: `username or email must be provided` });
    }

    validatePassword(password);

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

    const token = jwt.sign(
      {
        userId: user.id,
        username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "12h",
      }
    )

    return res.send({ message: "success login", token });
  } catch (error) {
    return res.status(500).send({ message: error.message, error });
  }
}

const getUsers = async (req, res) => {
  try {
    const limit = req.query?.limit || 10;
    const offset = req.query?.offset || ((req.query?.page || 1) - 1) * limit;
    const { count, rows: users } = await User.findAndCountAll({ limit, offset, include: [Post] });

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