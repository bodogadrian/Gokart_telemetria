const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();

router.post("/register_with_password",authController.register_with_password)
router.post("/login_with_password",authController.login_with_password)
router.post("/register_admin",authController.register_admin)
router.post("/login_admin",authController.login_admin)

module.exports = router;