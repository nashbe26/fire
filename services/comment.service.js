const Job = require("../models/company");
const Comment = require("../models/comment");
const httpError = require("http-errors");

const addComment = async (postId, commentContent, userId) => {
  const jobb = await Job.findById(postId).catch((err) => {
    console.log(err);
    throw httpError(500, "Internal server err");
  });

  if (!jobb) throw httpError(404, "no jobb to comment to");

  const new_comment = new Comment({
    id_owner: userId,
    commentContent: commentContent,
  });
  
  const savedComment = await new_comment.save().catch((err) => {
    console.log(err);
    throw httpError(500, "Internal server err");
  });
  
  jobb.comments.push(savedComment._id);
  
  await jobb.save().catch((err) => {
    console.log(err);
    throw httpError(500, "Internal server err");
  });

  return savedComment;

};

const getComments = async (postId) => {
    const Jobs = await Job.findById(postId)
      .populate({
        path: "comments",
        model: "Comments",
      })
      .catch((err) => {
        console.log(err);
        throw httpError(500, "Internal server err");
      });
    if (!Jobs) throw httpError(404, "can not get the post");
    return Jobs.comments;
  };

const getComment = async (commentId) => {
  const comment = await Comment.findById(commentId)
    .catch((err) => {
      console.log(err);
      throw httpError(500, "Internal server err");
    });
  if (!comment) throw httpError(404, "can not get comment");
  return comment;
};

const updateComment = async (commentId, userId, newContent) => {
  const comment = await Comment.findById(commentId).catch((err) => {
    console.log(err);
    throw httpError(500, "Internal server err");
  });
  if (!comment) throw httpError(404, "we can not update comment");
  if (comment.id_owner.toString() === userId.toString()) {
    comment.commentContent = newContent;
    const updatedComment = await comment.save().catch((err) => {
      console.log(err);
      throw httpError(500, "Internal server err");
    });
    return "comment updated successfully";
  } else {
    return "you can only update your comment";
  }
};

const deleteComment = async (commentId, userId) => {
  const comment = await Comment.findById(commentId).catch((err) => {
    console.log(err);
    throw httpError(500, "Internal server err");
  });
  if (!comment) throw httpError(404, "can not load comment");
  if (comment.id_owner.toString() === userId.toString()) {
    const deletedcomment = await comment.deleteOne().catch((err) => {
      console.log(err);
      throw httpError(500, "Internal server err");
    });
    return "comment deleted";
  } else {
    return "you can only delete your own comment";
  }
};



module.exports = {
  addComment,
  deleteComment,
  updateComment,
  getComment,
  getComments
};