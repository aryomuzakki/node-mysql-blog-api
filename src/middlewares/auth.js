"use strict"

const { verify } = require("jsonwebtoken");
const { User } = require("../models");

/** @type {import("express").Router} */
const authUser = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send({ message: "Unauthorized request" });
    }

    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedUser = verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ where: { id: decodedUser.userId } });

    if (!user) {
      return res.status(401).send({ message: "User not found in Authorization Token" });
    }

    req.body.userId = user.id;

    next();
  } catch (error) {
    return res.status(401).send({ message: error.message, error: error })
  }
}

module.exports = authUser