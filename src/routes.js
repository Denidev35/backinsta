const express = require("express");
const path = require("path");
const PostController = require("./app/controllers/PostController");
const LikeController = require("./app/controllers/LikeController");

const multer = require("multer");
const uploadConfig = require("./config/upload");

const routes = express.Router();
const upload = multer(uploadConfig);

routes.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);

routes.post("/posts", upload.single("image"), PostController.store);
routes.get("/posts", PostController.index);

routes.post("/posts/:id/like", LikeController.store);

module.exports = routes;
