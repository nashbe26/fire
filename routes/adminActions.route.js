const router = require("express").Router();

const {
    getUsersController,
    getUserByIdController,
    deleteUserController,
    getJobsController,
    getJobByIdController,
    deleteJobController,
} = require("../controllers/adminActions.controller");

router.get("/users", getUsersController);
router.get("/users/:id", getUserByIdController);
router.delete("/users/:id", deleteUserController);

router.get("/jobs", getJobsController);
router.get("/job/:id", getJobByIdController);
router.delete("/job/:id", deleteJobController);

module.exports = router;
