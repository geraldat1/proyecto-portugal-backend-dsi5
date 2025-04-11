const express = require("express");
const router = express.Router();
const configuracionController = require("../controllers/configuracion.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/configuracion", verifyToken, configuracionController.createConfiguracion);
router.get("/configuracion", verifyToken, configuracionController.getConfiguraciones);
router.get("/configuracion/:id",verifyToken, configuracionController.getConfiguracionById);
router.put("/configuracion/:id", verifyToken, configuracionController.updateConfiguracion);
router.delete("/configuracion/:id", verifyToken, configuracionController.deleteConfiguracion);

module.exports = router;
