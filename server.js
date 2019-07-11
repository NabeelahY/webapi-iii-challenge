// code away!
const express = require("express");

const userRoutes = require("./users/userRouter");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//custom middleware
function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);

  next();
}

server.use(logger);


server.use("/api/users", userRoutes);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;