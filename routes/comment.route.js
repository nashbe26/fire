const express = require("express");
const router = express.Router();
const commentController = require('../controllers/comment.controller');

router.post('/add/:postId',commentController.addComment);
router.get('/:commentId',commentController.getComment);
router.get('/all/:postId',commentController.getComments);
router.delete('/delete/:commentId',commentController.deleteComment);
router.put('/update/:commentId',commentController.updateComment);

module.exports = router;