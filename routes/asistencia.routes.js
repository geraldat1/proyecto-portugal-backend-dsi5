const express = require("express");
const router = express.Router();
const asistenciaController = require("../controllers/asistencia.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/asistencias", verifyToken, asistenciaController.createAsistencia);
router.get("/asistencias", verifyToken, asistenciaController.getAsistencias);
router.get("/asistencias/:id_asistencia",verifyToken, asistenciaController.getAsistenciaById);
router.put("/asistencias/:id_asistencia", verifyToken, asistenciaController.updateAsistencia);
router.delete("/asistencias/:id_asistencia", verifyToken, asistenciaController.deleteAsistencia);

module.exports = router;
