const router = require("express").Router();
const isAdminMiddleware = require("../middleware/isAdmin.middleware");

const {
    createNewEnrollController,
    getEnrollsController,
    getEnrollByIdController,
    deleteEnrollController,
} = require("../controllers/enroll.controller.js");

/**
 *
 * Takes POST request at <API>/enroll-rap to create new enroll message
 *
 * @param message <String> @required
 *
 * @returns {message}
 *
 */
router.post("/", createNewEnrollController);

/**
 * Takes GET request at <API>/enroll-rap/messages/:<messageId>
 * to display message data
 *
 * @returns {message}
 *
 */
router.get("/messages/:id", isAdminMiddleware, getEnrollByIdController);

/**
 *
 * Takes GET request at <API>/enroll-rap/messages
 * to display all enrollrap messages
 *
 * @returns {message[]}
 *
 */
router.get("/messages", isAdminMiddleware, getEnrollsController);

/**
 *
 * Takes DELETE request at <API>/enroll-rap/messages/:<messageId>
 *
 * @returns {success: true | flase}
 */
router.delete("/messages/:id", isAdminMiddleware, deleteEnrollController);

module.exports = router;
