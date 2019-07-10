const express = require("express");
const User = require("./userDb");
const router = express.Router();

// router.post("/", (req, res) => {});

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

// router.get("/:id", (req, res) => {});

// router.get("/:id/posts", (req, res) => {});

// router.delete("/:id", (req, res) => {});

// router.put("/:id", (req, res) => {});

//custom middleware

// function validateUserId(req, res, next) {}

// function validateUser(req, res, next) {}

// function validatePost(req, res, next) {}

module.exports = router;
