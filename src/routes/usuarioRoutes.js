const express = require("express");
const router =  express.Router();
const userController = require("../controllers/usuarioControllers");

router.post("/create", userController.createUsuario);
router.get("/get/:id", userController.getUsuario);
router.get("/getAll", userController.getAllUsuarios);
router.put("/update/:id", userController.updateUsuario);
router.delete("/delete/:id", userController.deleteUsuario);

module.exports = router;