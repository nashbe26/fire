var express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const jobController = require("../controllers/company.controller");
const {
  validateCompanySchema,
  validateTalentSchema,
} = require("../middleware/schema.middleware");

router.post("/registerTalent", validateTalentSchema, authController.register);
router.post(
  "/registerCompany",
  validateCompanySchema,
  jobController.createCompany
);
router.get("/mail_exist/:mail", authController.mailExist);

router.post("/loginCompany", authController.loginCompany);
router.post("/loginTalent", authController.login);
router.post("/loginAdmin", authController.loginAdmin);
router.post("/loginCompanyVerif", authController.loginCompanyVerif);
router.post("/loginTalentVerif", authController.loginVerif);
router.post("/forgot-password", authController.forgetAccount);
router.post("/verif-account/:token", authController.verifMail);
router.post("/reset-password", authController.resetAccount);

module.exports = router;
