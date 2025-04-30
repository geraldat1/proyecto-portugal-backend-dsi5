const express = require("express");
const router = express.Router();
const asistenciaController = require("../controllers/asistencia.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/asistencias", verifyToken, asistenciaController.createAsistencia);
router.get("/asistencias", verifyToken, asistenciaController.getAsistencias);
router.get("/asistencias/:id",verifyToken, asistenciaController.getAsistenciaById);
router.put("/asistencias/:id", verifyToken, asistenciaController.updateAsistencia);
router.delete("/asistencias/:id", verifyToken, asistenciaController.deleteAsistencia);

module.exports = router;
