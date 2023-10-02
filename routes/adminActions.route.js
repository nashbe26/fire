const router = require("express").Router();
const isAdminMiddleware = require("../middleware/isAdmin.middleware");

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
router.get("/users", isAdminMiddleware, getUsersController);

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
router.get("/users/:id", isAdminMiddleware, getUserByIdController);

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
router.delete("/users/:id", isAdminMiddleware, deleteUserController);

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
router.get("/jobs", isAdminMiddleware, getJobsController);

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
router.get("/jobs/:id", isAdminMiddleware, getJobByIdController);

/**
 *
 * Takes DELETE Request at <API>/admin/jobs
 * to DELETE job
 *
 * @requires <AdminRole>
 *
 * @param data <jobId[]>
 *
 * @returns {successStatus}
 *
 */
router.delete("/jobs/:id", isAdminMiddleware, deleteJobController);

module.exports = router;
