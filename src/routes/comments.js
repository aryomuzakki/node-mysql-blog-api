const { getCommentsByPostId, createComment, getCommentById, updateComment, deleteComment } = require("../controller/commentController");
const authUser = require("../middlewares/auth");

const commentsRoute = require("express").Router();

commentsRoute.use(["/posts/:postId/comments", "/comments"], authUser);
commentsRoute.get("/posts/:postId/comments", getCommentsByPostId);
commentsRoute.get("/comments/:id", getCommentById);
commentsRoute.post("/posts/:postId/comments", createComment);
commentsRoute.put("/comments/:id", updateComment);
commentsRoute.delete("/comments/:id", deleteComment);

module.exports = commentsRoute;