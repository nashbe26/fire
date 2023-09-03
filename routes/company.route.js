const express = require("express");
const router = express.Router();

const CompanyController = require("../controllers/company.controller");
const { validateCurrentCompanyUpdate } = require("../middleware/verify.middleware");

router.post("/updateImg", CompanyController.updateImg);

router.get("/getAllCompany", CompanyController.getAllCompany);
router.get("/getCompanyByName/:name", CompanyController.getCompanyByName);
router.get("/getCompanyById/:jobId", CompanyController.getCompanyById);
router.put("/updateCompany/:job_id",validateCurrentCompanyUpdate,CompanyController.updateCompany);
router.put("/updatePassword",validateCurrentCompanyUpdate,CompanyController.updatePassword);
router.delete("/deleteCompany/:job_id", CompanyController.deleteCompany);

module.exports = router;    
