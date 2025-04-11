const express = require("express");
const router = express.Router();
const pagosplanController = require("../controllers/pagos_plan.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/pagosplan", verifyToken, pagosplanController.createPagosPlan);
router.get("/pagosplan", verifyToken, pagosplanController.getPagosPlanes);
router.get("/pagosplan/:id",verifyToken, pagosplanController.getPagosPlanById);
router.put("/pagosplan/:id", verifyToken, pagosplanController.updatePagosPlan);
router.delete("/pagosplan/:id", verifyToken, pagosplanController.deletePagosPlan);

module.exports = router;
