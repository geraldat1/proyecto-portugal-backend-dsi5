const express = require("express");
const router = express.Router();
const rutinaplanController = require("../controllers/rutina_plan.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/rutinaplan", verifyToken, rutinaplanController.createRutinaplan);
router.get("/rutinaplan", verifyToken, rutinaplanController.getRutinaplanes);
router.get("/rutinaplan/:id",verifyToken, rutinaplanController.getRutinaplanById);
router.put("/rutinaplan/:id", verifyToken, rutinaplanController.updateRutinaplan);
router.delete("/rutinaplan/:id", verifyToken, rutinaplanController.deleteRutinaplan);

module.exports = router;
