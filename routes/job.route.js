const express = require("express");
const router = express.Router();

const jobController = require("../controllers/job.controller");
const { validateJobOwnerUpdate } = require("../middleware/verifyJobOwner.middleware");


router.get("/getAllJob", jobController.getAllJob);
router.get("/getJobByName/:name", jobController.getJobByName);
router.get("/getJobById/:jobId", jobController.getJobById);
router.post("/createJob", jobController.createJob);
router.put("/updateJob/:job_id",validateJobOwnerUpdate,jobController.updateJob);
router.delete("/deleteJob/:job_id", validateJobOwnerUpdate,jobController.deleteJob);
router.put("/condidate/:job_id", validateJobOwnerUpdate,jobController.condidateJob);

module.exports = router;    
