const express = require("express");
const router = express.Router();

const auditoriaController = require("../controllers/auditoriaControllers");

router.get("/", auditoriaController.getLogs);
router.get("/usuario/:usuarioId", auditoriaController.getLogsByUser);
router.get("/:id", auditoriaController.getLogById);

module.exports = router;