const express = require("express");
const router = express.Router();
const entrenadorController = require("../controllers/entrenador.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/entrenador", verifyToken, entrenadorController.createEntrenador);
router.get("/entrenador", verifyToken, entrenadorController.getEntrenadores);
router.get("/entrenador/:id",verifyToken, entrenadorController.getEntrenadorById);
router.put("/entrenador/:id", verifyToken, entrenadorController.updateEntrenador);
router.delete("/entrenador/:id", verifyToken, entrenadorController.deleteEntrenador);

module.exports = router;
