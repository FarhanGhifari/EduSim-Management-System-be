const express = require("express");

const dashboardRoute = (controllers, repositories) => {
  const { dashboardController } = controllers;
  const authMiddleware = require("../middleware/auth-middleware")(repositories);
  const router = express.Router();

  router.get(
    "/dashboard/counting",
    authMiddleware.authenticate,
    dashboardController.counting
  );

  return router;
};

module.exports = dashboardRoute;
