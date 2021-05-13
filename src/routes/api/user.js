const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/UserController");

// регистрация
router.post("/signup", UserController.signup);

// аутентификация
router.post("/signin", UserController.signin);

// выход
router.post("/logout", UserController.logout);

module.exports = router;
