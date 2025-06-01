const express = require("express");
const router = express.Router();
const detalleplanController = require("../controllers/detalle_plan.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/detalleplan", verifyToken, detalleplanController.createDetallePlan);
router.get("/detalleplan", verifyToken, detalleplanController.getDetallePlanes);
router.get("/detalleplan/:id",verifyToken, detalleplanController.getDetallePlanById);
router.put("/detalleplan/:id", verifyToken, detalleplanController.updateDetallePlan);
router.delete("/detalleplan/:id", verifyToken, detalleplanController.deleteDetallePlan);



module.exports = router;
