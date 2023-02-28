const express = require("express");
const router = express.Router();

const jobController = require("../controllers/job.controller");


router.get("/getAllJob", jobController.getAllJob);
router.get("/getJobByName/:name", jobController.getJobByName);
router.get("/getJobById/:jobId", jobController.getJobById);
router.post("/createJob",jobController.createJob);
router.put("/updateJob/:job_id",jobController.updateJob);
router.delete("/delete/:job_id", jobController.deleteJob);

module.exports = router;    
