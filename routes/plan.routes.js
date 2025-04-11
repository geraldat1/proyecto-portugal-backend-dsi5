const express = require("express");
const router = express.Router();
const planController = require("../controllers/plan.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/planes", verifyToken, planController.createPlan);
router.get("/planes", verifyToken, planController.getPlanes);
router.get("/planes/:id",verifyToken, planController.getPlanById);
router.put("/planes/:id", verifyToken, planController.updatePlan);
router.delete("/planes/:id", verifyToken, planController.deletePlan);

module.exports = router;
