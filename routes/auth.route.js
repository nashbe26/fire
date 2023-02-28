var express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

router.post("/register/:type", authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgetAccount);
router.get("/reset-password", authController.resetAccount);

module.exports = router;
