const express = require("express");
const router = express.Router();
const rutinaController = require("../controllers/rutina.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/rutinas", verifyToken, rutinaController.createRutina);
router.get("/rutinas", verifyToken, rutinaController.getRutinas);
router.get("/rutinas/:id",verifyToken, rutinaController.getRutinaById);
router.put("/rutinas/:id", verifyToken, rutinaController.updateRutina);
router.delete("/rutinas/:id", verifyToken, rutinaController.deleteRutina);

module.exports = router;
