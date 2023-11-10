const { getUsers } = require("../controller/userController");

const usersRoute = require("express").Router();

usersRoute.get("/users", getUsers);

module.exports = usersRoute;