const { registerUser, loginUser } = require("../controller/userController");

const authRoute = require("express").Router();

authRoute.post("/auth/login", loginUser);
authRoute.post("/auth/register", registerUser);

module.exports = authRoute;