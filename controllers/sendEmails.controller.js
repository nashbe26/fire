const asyncHandler = require("express-async-handler");
const { sendEmails, sendMultiEmails } = require("../services/sendEmails.service");

const sendEmailsController = asyncHandler(async (req, res) => {
    try {
        const send = await sendEmails(req.body);

        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});

const sendEmailsMultiController = asyncHandler(async (req, res) => {
    try {
        console.log(req.body);
        const send = await sendMultiEmails(req.body);

        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});

module.exports = { sendEmailsController ,sendEmailsMultiController};
