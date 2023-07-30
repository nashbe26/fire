const express = require("express");
const router = express.Router();
const DiscussionController = require("../controllers/discussion.controller");

router.post("/createDiscussions", DiscussionController.createDiscussion);
router.get("/getMyDiscussions", DiscussionController.getMyDiscussion);
router.get("/getDiscussions/:discussionId", DiscussionController.getDiscussion);
router.delete(
  "/deleteDiscussions/:discussionId",
  DiscussionController.deleteDiscussion
);

module.exports = router;
