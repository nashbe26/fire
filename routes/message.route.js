const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/message.controller");

router.post("/createMessages", MessageController.createMessage);
router.get("/getMessages/:discId", MessageController.getMessagesInDiscussion);
router.delete("/delteMssages/:messageId", MessageController.deleteMessage);
router.post("/makeSeen", MessageController.makeSeen);

module.exports = router;
