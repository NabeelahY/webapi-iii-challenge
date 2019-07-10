// code away!
const express = require("express");

const userRoutes = require("./users/userRouter");

const server = express();

server.use(express.json());

//custom middleware
function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);

  next();
}

server.use(logger);

server.use(express.urlencoded({ extended: true }));

server.use("/api", userRoutes);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


server.listen(5000, () => {
  console.log("listening on 5000");
});

module.exports = server;
