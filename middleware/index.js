//custom middleware
const User = require("../users/userDb");
const Post = require("../posts/postDb");
module.exports = {
  validateUserId,
  validateUser,
  validatePost
};

async function validateUserId(req, res, next) {
  const { id } = req.params;

  if (isNaN(Number(id))) {
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
  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: "missing post data" });
  }
  if (!text) {
    return res.status(400).json({ message: "missing required text field" });
  }
  next();
}
