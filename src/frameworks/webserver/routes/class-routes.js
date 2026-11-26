const express = require("express");

const classRoute = (controllers, repositories) => {
  const { classController } = controllers;
  const authMiddleware = require("../middleware/auth-middleware")(repositories);
  const router = express.Router();

  // VIEW — Admin & Instruktur
  router.get(
    "/classes",
    authMiddleware.authenticate,
    authMiddleware.allowRoles("Admin", "Instruktur"),
    classController.index
  );

  router.get(
    "/classes/:id",
    authMiddleware.authenticate,
    authMiddleware.allowRoles("Admin", "Instruktur"),
    classController.show
  );

  // CRUD — Admin only
  router.post(
    "/classes",
    authMiddleware.authenticate,
    authMiddleware.allowRoles("Admin"),
    classController.create
  );

  router.patch(
    "/classes/:id",
    authMiddleware.authenticate,
    authMiddleware.allowRoles("Admin"),
    classController.update
  );

  router.delete(
    "/classes/:id",
    authMiddleware.authenticate,
    authMiddleware.allowRoles("Admin"),
    classController.destroy
  );

  return router;
};

module.exports = classRoute;
