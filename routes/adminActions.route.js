const router = require("express").Router();

const {
  getUsersController,
  getUserByIdController,
  deleteUserController,
  getJobsController,
  getJobByIdController,
  deleteJobController,
} = require("../controllers/adminActions.controller");

/**
 *
 * Takes GET Request at <API>/admin/users
 * to display users
 *
 * @requires <AdminRole>
 *
 * @returns {User[]}
 *
 */
router.get("/users", getUsersController);

/**
 *
 * Takes GET Request at <API>/admin/users/<userId>
 * to display user data
 *
 * @requires <AdminRole>
 *
 *
 * @returns {User}
 *
 */
router.get("/users/:id", getUserByIdController);

/**
 *
 * Takes DELETE Request at <API>/admin/users/<userId>
 * to Delete user
 *
 * @requires <AdminRole>
 *
 *
 * @returns {successStatus}
 *
 */
router.delete("/users/:id", deleteUserController);

/**
 *
 * Takes GET Request at <API>/admin/jobs
 * to display jobs
 *
 * @requires <AdminRole>
 *
 * @returns {Jobs[]}
 *
 */
router.get("/jobs", getJobsController);

/**
 *
 * Takes GET Request at <API>/admin/jobs/<jobId>
 * to display job data
 *
 * @requires <AdminRole>
 *
 * @returns {Jobs[]}
 *
 */
router.get("/jobs/:id", getJobByIdController);

/**
 *
 * Takes DELETE Request at <API>/admin/jobs/<jobId>
 * to DELETE job
 *
 * @requires <AdminRole>
 *
 * @returns {successStatus}
 *
 */
router.delete("/jobs/:id", deleteJobController);

module.exports = router;
