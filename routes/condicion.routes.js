const express = require("express");
const router = express.Router();
const condicionController = require("../controllers/condicion.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/condicion", verifyToken, condicionController.createCondicion);
router.get("/condicion", verifyToken, condicionController.getCondiciones);
router.get("/condicion/:id",verifyToken, condicionController.getCondicionById);
router.put("/condicion/:id", verifyToken, condicionController.updateCondicion);
router.delete("/condicion/:id", verifyToken, condicionController.deleteCondicion);

module.exports = router;
