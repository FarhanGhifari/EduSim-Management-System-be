const express = require("express");

const testRoute = (controllers, repositories) => {
  const { testController } = controllers;
  const authMiddleware = require("../middleware/auth-middleware")(repositories);
  const router = express.Router();

  // VIEW — Admin, Instruktur & Siswa
  router.get(
    "/tests",
    authMiddleware.authenticate,
    authMiddleware.allowRoles("Admin", "Instruktur", "Siswa"),
    testController.index
  );

  router.get(
    "/tests/:id",
    authMiddleware.authenticate,
    authMiddleware.allowRoles("Admin", "Instruktur", "Siswa"),
    testController.show
  );

  // CRUD — Admin only
  router.post(
    "/tests",
    authMiddleware.authenticate,
    authMiddleware.allowRoles("Admin"),
    testController.create
  );

  router.patch(
    "/tests/:id",
    authMiddleware.authenticate,
    authMiddleware.allowRoles("Admin"),
    testController.update
  );

  router.delete(
    "/tests/:id",
    authMiddleware.authenticate,
    authMiddleware.allowRoles("Admin"),
    testController.destroy
  );

  return router;
};

module.exports = testRoute;
