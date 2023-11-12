const { Comment, User, Post } = require("../models");
const { sequelizeErrorHandler, validateRequiredFields } = require("../lib");

const getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;
    const limit = req.query?.limit || 10;
    const offset = req.query?.offset || ((req.query?.page || 1) - 1) * limit;
    const { count, rows: comments } = await Comment.findAndCountAll({ where: { postId }, limit, offset, include: [User, Post] });

    return res.send({
      data: comments,
      metadata: {
        offset,
        limit,
        currentRows: comments.length,
        totalRows: count,
      }
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, error });
  }
}

const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findOne({ where: { id }, include: User, Post });

    if (!comment) {
      return res.status(404).send({ message: `comment with id ${id} was not found` });
    }

    return res.send(comment);
  } catch (error) {
    return res.status(500).send({ message: error.message, error });
  }
}

const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { comment, userId } = req.body;

    validateRequiredFields({ comment }, { res });

    const newComment = await Comment.create({
      postId: parseInt(postId),
      userId,
      comment,
    });

    if (!newComment) {
      throw new Error("Failed creating new comment");
    }

    return res.status(201).send({ message: "new comment has been created", data: newComment });

  } catch (error) {
    return sequelizeErrorHandler(error, { res }) || res.status(error.statusCode || 500).send({ message: error.message, error });
  }
}

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, userId, postId } = req.body;

    validateRequiredFields({ comment }, { res });

    const newUpdateComment = await Comment.findOne({ where: { id } });

    if (!newUpdateComment) {
      return res.status(404).send({ message: `comment with id ${id} was not found` });
    }

    Object.entries({ comment, userId, postId }).forEach(([key, val]) => {
      if (val) {
        newUpdateComment[key] = val;
      }
    })

    const updatedComment = await newUpdateComment.save();

    return res.status(201).send({ message: `comment with id ${id} has been updated`, data: updatedComment });
  } catch (error) {
    return sequelizeErrorHandler(error, { res }) || res.status(error.statusCode || 500).send({ message: error.message, error });
  }
}

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Comment.destroy({ where: { id } });

    if (result === 0) {
      return res.status(404).send({ message: `comment with id ${id} was not found` });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).send({ message: error.message, error });
  }
}

module.exports = {
  getCommentsByPostId,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
}