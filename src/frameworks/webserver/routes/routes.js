const globalErrorHandling = require("../../../adapters/controllers/error-response-controller");
const appErrorHelper = require("../../helpers/app-error");
const express = require("express");

// Routes
const userRoutes = require("./user-routes");
const profileRoutes = require("./profile-routes");
const dashboardRoutes = require("./dashboard-routes");
const moduleRoutes = require("./module-routes");
const questionRoutes = require("./question-routes");
const testRoutes = require("./test-routes");
const classRoutes = require("./class-routes");

const routes = (app, controllers, repositories) => {
  const { authController } = controllers;

  // AUTH
  app.post("/api/v1/login", authController.login);
  
  // USER
  app.use("/api/v1", userRoutes(controllers, repositories));

  // PROFILE
  app.use("/api/v1", profileRoutes(controllers, repositories));

  // DASHBOARD
  app.use("/api/v1", dashboardRoutes(controllers, repositories));

  // MODULE
  app.use("/api/v1", moduleRoutes(controllers, repositories));

  // QUESTION
  app.use("/api/v1", questionRoutes(controllers, repositories));

  // TEST 
  app.use("/api/v1", testRoutes(controllers, repositories));

  // CLASS
  app.use("/api/v1", classRoutes(controllers, repositories));

  app.use("/storage", express.static("storage"));

  // error handling...
  app.use("*", (req, res, next) => {
    next(new appErrorHelper(`[${req.method}] url not found`, 404));
  });
  app.use(globalErrorHandling);
};

module.exports = routes;
