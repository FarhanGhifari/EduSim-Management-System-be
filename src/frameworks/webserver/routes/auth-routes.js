const express = require("express");

const authRoute = (controllers) => {
  const { authController } = controllers;
  const router = express.Router();

  router.post("/login", authController.login);

  return router;
};

module.exports = authRoute;
