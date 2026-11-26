const express = require("express");

const profileRoute = (controllers, repositories) => {
  const { profileController } = controllers;
  const authMiddleware = require("../middleware/auth-middleware")(repositories);
  const router = express.Router();

  // PROFILE
  router.get(
    "/profile",
    authMiddleware.authenticate,
    profileController.showProfile,
  );
  router.put(
    "/profile/info",
    authMiddleware.authenticate,
    profileController.updateInfo,
  );
  router.put(
    "/profile/password",
    authMiddleware.authenticate,
    profileController.updatePassword,
  );

  return router;
};

module.exports = profileRoute;
