const router = require("express").Router();

const {
    sendEmailsController,
} = require("../controllers/sendEmails.controller");
const isAdminMiddleware = require("../middleware/isAdmin.middleware");

/**
 *
 * Takes POST request at <API>/send-emails
 *
 * @requires <AdminRole>
 *
 * @param senderEmail
 * @param to {email | email[]} @requred
 * @param subject {String}
 * @param html {ValidHtmlTemplate}
 * @param text {string}
 * @param attachments {String | Object | String[] | Object[]} // https://nodemailer.com/message/attachments/
 */
router.post("/", isAdminMiddleware, sendEmailsController);

module.exports = router;
