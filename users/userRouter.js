const express = require("express");
const User = require("./userDb");
const Post = require("../posts/postDb");
const router = express.Router();
const {
  validateUserId,
  validatePost,
  validateUser
} = require("../middleware/index");

router.post("/", validateUser, async (req, res) => {
  try {
    const { body } = req;
    const newUser = await User.insert(body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({
      message: "Error creating users"
    });
  }
});

router.post("/:id/posts", validateUserId, validatePost, async (req, res) => {
  try {
    const { body, params } = req;
    const bodyWithId = { ...body, user_id: params.id };
    const newPost = await Post.insert(bodyWithId);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({
      message: "Error creating post"
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await User.get(req.query);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving users"
    });
  }
});

router.get("/:id", validateUserId, async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the user"
    });
  }
});

router.get("/:id/posts", validateUserId, async (req, res) => {
  try {
    const userPosts = await User.getUserPosts(req.params.id);
    res.status(200).json(userPosts);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the user"
    });
  }
});

router.delete("/:id", validateUserId, async (req, res) => {
  try {
    await User.remove(req.params.id);
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting the user"
    });
  }
});

// router.put("/:id", (req, res) => {});

module.exports = router;
