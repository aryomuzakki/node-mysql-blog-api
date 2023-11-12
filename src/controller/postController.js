const { Post, User } = require("../models");
const { sequelizeErrorHandler, validateRequiredFields } = require("../lib");

const getAllPosts = async (req, res) => {
  try {
    const limit = req.params?.limit || 10;
    const offset = req.params?.offset || ((req.params?.page || 1) - 1) * limit;
    const { count, rows: posts } = await Post.findAndCountAll({ include: User });

    return res.send({
      data: posts,
      metadata: {
        offset,
        limit,
        currentRows: posts.length,
        totalRows: count,
      }
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, error });
  }
}

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findOne({ where: { id }, include: User });

    if (!post) {
      return res.status(404).send({ message: `post with id ${id} was not found` });
    }

    return res.send(post);
  } catch (error) {
    return res.status(500).send({ message: error.message, error });
  }
}

const createPost = async (req, res) => {
  try {
    const { title, body, userId } = req.body;

    validateRequiredFields({ title, body, userId }, { res });

    const newPost = await Post.create({
      title,
      body,
      userId,
    });

    if (!newPost) {
      throw new Error("Failed creating new post");
    }

    return res.status(201).send({ message: "new post has been created", data: newPost });

  } catch (error) {
    return sequelizeErrorHandler(error, { res }) || res.status(error.statusCode || 500).send({ message: error.message, error });
  }
}

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body, userId } = req.body;

    const newUpdatePost = await Post.findOne({ where: { id } });

    if (!newUpdatePost) {
      return res.status(404).send({ message: `post with id ${id} was not found` });
    }

    Object.entries({ title, body, userId }).forEach(([key, val]) => {
      if (val) {
        newUpdatePost[key] = val;
      }
    })

    const updatedPost = await newUpdatePost.save();

    return res.status(201).send({ message: `post with id ${id} has been updated`, data: updatedPost });
  } catch (error) {
    return sequelizeErrorHandler(error, { res }) || res.status(error.statusCode || 500).send({ message: error.message, error });
  }
}

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Post.destroy({ where: { id } });

    if (result === 0) {
      return res.status(404).send({ message: `post with id ${id} was not found` });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).send({ message: error.message, error });
  }
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
}