const express = require("express");

const questionRoute = (controllers, repositories) => {
  const { questionController } = controllers;
  const authMiddleware = require("../middleware/auth-middleware")(repositories);
  const router = express.Router();

  // QUESTIONS — Admin & Instruktur
  router.get(
    "/questions",
    authMiddleware.authenticate,
    authMiddleware.allowRoles("Admin", "Instruktur"),
    questionController.index
  );

  router.get(
    "/questions/:id",
    authMiddleware.authenticate,
    authMiddleware.allowRoles("Admin", "Instruktur"),
    questionController.show
  );

  router.post(
    "/questions",
    authMiddleware.authenticate,
    authMiddleware.allowRoles("Admin", "Instruktur"),
    questionController.create
  );

  router.put(
    "/questions/:id",
    authMiddleware.authenticate,
    authMiddleware.allowRoles("Admin", "Instruktur"),
    questionController.update
  );

  router.delete(
    "/questions/:id",
    authMiddleware.authenticate,
    authMiddleware.allowRoles("Admin", "Instruktur"),
    questionController.destroy
  );

  router.post(
    "/questions/import",
    authMiddleware.authenticate,
    authMiddleware.allowRoles("Admin", "Instruktur"),
    questionController.uploadMiddleware,
    questionController.importHandler
  );

  return router;
};

module.exports = questionRoute;
