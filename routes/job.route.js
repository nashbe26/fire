const express = require("express");
const router = express.Router();

const jobController = require("../controllers/job.controller");
const {
  validateJobOwnerUpdate,
} = require("../middleware/verifyJobOwner.middleware");

const authMiddleware = require("../middleware/auth.middleware");

router.get("/getAllJob", jobController.getAllJob);
router.get("/getCompanyJobs", authMiddleware, jobController.getCompanyJobs);
router.get("/getJobByName/:name", jobController.getJobByName);
router.get("/getJobById/:jobId", jobController.getJobById);
router.put("/likedJobs/:jobId",authMiddleware, jobController.likedJobs);
router.post("/createJob", authMiddleware, jobController.createJob);
router.put("/updateStatusJobUser", authMiddleware, jobController.updateStatusJobUser);
router.put(
  "/updateJob/:job_id",
  authMiddleware,
  validateJobOwnerUpdate,
  jobController.updateJob
);
router.delete(
  "/deleteJob/:job_id",
  authMiddleware,
  validateJobOwnerUpdate,
  jobController.deleteJob
);

router.put(
  "/condidate/:job_id",
  authMiddleware,
  // validateJobOwnerUpdate, // this is not for update company data
  jobController.condidateJob
);

router.put(
  "/condidate_update/:condidateId",
  authMiddleware,
  // validateJobOwnerUpdate, // this is not for update company data
  jobController.UpdateCandidate
);
router.put(
  "/updateJobStatus/:jobId",
  authMiddleware,
  // validateJobOwnerUpdate, // this is not for update company data
  jobController.updateJobStatus
);
router.put(
  "/updateSavedJob/:jobId",
  authMiddleware,
  // validateJobOwnerUpdate, // this is not for update company data
  jobController.updateSavedJob
);
module.exports = router;
