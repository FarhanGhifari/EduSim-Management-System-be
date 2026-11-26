const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const userRoute = (controllers, repositories) => {
    const { userController } = controllers;
    const authMiddleware = require("../middleware/auth-middleware")(repositories);
    const router = express.Router();

    // USERS - Read Only untuk Instruktur
    router.get("/users", authMiddleware.authenticate, authMiddleware.allowRoles("Admin", "Instruktur"), userController.index);
    router.get("/users/:id", authMiddleware.authenticate, authMiddleware.allowRoles("Admin", "Instruktur"), userController.show);
    router.post("/users", authMiddleware.authenticate, authMiddleware.allowRoles("Admin"), userController.create);
    router.patch("/users/:id", authMiddleware.authenticate, authMiddleware.allowRoles("Admin"), userController.update);
    router.delete("/users/:id", authMiddleware.authenticate, authMiddleware.allowRoles("Admin"), userController.destroy);
    router.post("/users/import", authMiddleware.authenticate, authMiddleware.allowRoles("Admin"), upload.single("file"), userController.importUser);

    return router;
};

module.exports = userRoute;
