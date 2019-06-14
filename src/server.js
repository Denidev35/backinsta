const express = require("express");
const mongoose = require("mongoose");
const databaseConfig = require("./config/database");
const cors = require("cors");

class App {
  constructor() {
    this.express = express();
    this.server = require("http").Server(this.express);
    this.io = require("socket.io")(this.server);
    this.isDev = process.env.NODE_ENV !== "production";

    this.database();
    this.middleware();
    this.routes();
  }

  database() {
    mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true
    });
  }

  middleware() {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use((req, res, next) => {
      req.io = this.io;
      return next();
    });
  }

  routes() {
    this.express.use(require("./routes"));
  }
}

module.exports = new App().server;
