const express = require("express");
const User = require("./userDb");
const Post = require("../posts/postDb");
const router = express.Router();

router.post("/users", validateUser, async (req, res) => {
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

// router.post("/:id/posts", (req, res) => {});

router.get("/users", async (req, res) => {
  try {
    const posts = await User.get(req.query);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving users"
    });
  }
});

router.get("/users/:id", validateUserId, async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the user"
    });
  }
});

// router.get("/:id/posts", (req, res) => {});

// router.delete("/:id", (req, res) => {});

// router.put("/:id", (req, res) => {});

//custom middleware

async function validateUserId(req, res, next) {
  const { id } = req.params;

  if (isNaN(parseInt(id, 10))) {
    return res.status(400).json({ message: "IDs should be a numerical value" });
  }

  const user = await User.getById(id);

  if (!user) {
    return res.status(404).json({ message: "Invalid user id" });
  } else {
    req.user = user;
    next();
  }
}

async function validateUser(req, res, next) {
  const { name } = req.body;
  if (!req.body) {
    return res.status(400).json({ message: "missing user data" });
  }
  if (!name) {
    return res.status(400).json({ message: "missing user name" });
  }
  next();
}

async function validatePost(req, res, next) {
  const { text } = req.body;
  if (!req.body) {
    return res.status(400).json({ message: "missing post data" });
  }
  if (!text) {
    return res.status(400).json({ message: "missing required text field" });
  }
  next();
}

module.exports = router;
