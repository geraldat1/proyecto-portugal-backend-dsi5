const express = require("express");
const router = express.Router();
const personaController = require("../controllers/persona.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/personas", verifyToken, personaController.createPersona);
router.get("/personas", verifyToken, personaController.getPersonas);
router.get("/personas/:id",verifyToken, personaController.getPersonaById);
router.put("/personas/:id", verifyToken, personaController.updatePersona);
router.delete("/personas/:id", verifyToken, personaController.deletePersona);

module.exports = router;
