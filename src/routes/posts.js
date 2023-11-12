const { getAllPosts, createPost, getPostById, updatePost, deletePost } = require("../controller/postController");
const authUser = require("../middlewares/auth");

const postsRoute = require("express").Router();

postsRoute.get("/posts", getAllPosts);
postsRoute.get("/posts/:id", getPostById);

postsRoute.use("/posts", authUser);
postsRoute.post("/posts", createPost);
postsRoute.put("/posts/:id", updatePost);
postsRoute.delete("/posts/:id", deletePost);

module.exports = postsRoute;