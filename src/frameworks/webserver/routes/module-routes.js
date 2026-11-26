const express = require("express");

const moduleRoute = (controllers, repositories) => {
  const { moduleController } = controllers;
  const authMiddleware = require("../middleware/auth-middleware")(repositories);
  const router = express.Router();

  router.get(
    "/modules",
    authMiddleware.authenticate,
    authMiddleware.allowRoles("Admin", "Instruktur", "Siswa"),
    moduleController.index
  );

  router.post(
    "/modules/upload",
    authMiddleware.authenticate,
    authMiddleware.allowRoles("Admin", "Instruktur"),
    moduleController.uploadMiddleware,
    moduleController.upload
  );

  router.post(
    "/modules",
    authMiddleware.authenticate,
    authMiddleware.allowRoles("Admin", "Instruktur"),
    moduleController.create
  );

  router.get(
    "/modules/:id",
    authMiddleware.authenticate,
    authMiddleware.allowRoles("Admin", "Instruktur", "Siswa"),
    moduleController.show
  );

  router.patch(
    "/modules/:id",
    authMiddleware.authenticate,
    authMiddleware.allowRoles("Admin", "Instruktur"),
    moduleController.update
  );

  router.delete(
    "/modules/:id",
    authMiddleware.authenticate,
    authMiddleware.allowRoles("Admin", "Instruktur"),
    moduleController.destroy
  );

  return router;
};

module.exports = moduleRoute;
