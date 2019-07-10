const express = require("express");
const User = require("./userDb");
const router = express.Router();

// router.post("/users", async(req, res) => {

// });

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
  if (!name) {
    return res.status(404).json({ message: "missing user data" });
  }
}

// function validatePost(req, res, next) {}

module.exports = router;
