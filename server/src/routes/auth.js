const express = require("express");
const AuthController = require("../controllers/AuthController");
const { validateSignIn } = require("../middleware/validate");

const router = express.Router();

router.post("/auth", [validateSignIn, AuthController.login]);

module.exports = router;
