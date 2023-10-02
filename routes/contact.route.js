const router = require("express").Router();
const isAdminMiddleware = require("../middleware/isAdmin.middleware");
const {
  createNewContactMessageController,
  getContactMessagesController,
  getContactMessageByIdController,
  deleteContactMessageController,
} = require("../controllers/contact.controller");

/**
 *
 * Takes POST request at <api>/contact to create new contact message
 * Request body Params:
 * @param firstName <String> Required
 * @param lastName <String> Required
 * @param email <String> Required
 * @param message <String> Required
 *
 *
 */
router.post("/", createNewContactMessageController);

/**
 *
 * Takes GET request at <api>/contact/messages to display
 * contact messages
 *
 * @requires <AdminRole>
 *
 * @returns {messages[]}
 *
 */
router.get("/messages", isAdminMiddleware, getContactMessagesController);

/**
 *
 * Takes GET request at <api>/contact/messages/:<messageId>
 * to display message data
 * @requires <AdminRole>
 *
 * @returns {message}
 *
 */
router.get("/messages/:id", isAdminMiddleware, getContactMessageByIdController);

/**
 *
 * Takes DELETE request at <api>/contact/messages
 *  @requires <AdminRole>
 *
 */
router.delete("/messages", isAdminMiddleware, deleteContactMessageController);

module.exports = router;
