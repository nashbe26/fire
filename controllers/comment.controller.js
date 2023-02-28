const asyncHandler = require("express-async-handler");
const commentServices = require("../services/comment.service");


const addComment = asyncHandler(async(req,res)=> {
    const postId =req.params.postId;
    const commentContent = req.body.commentContent;
    let newComment = await commentServices.addComment(postId,commentContent,req.user);
    res.status(200).json(newComment); 

});

const getComments = asyncHandler(async(req,res)=> {
    
    const postId = req.params.postId;
    let comments = await commentServices.getComments(postId);
    res.status(200).json(comments);
    
});

const getComment = asyncHandler (async(req,res) => {
    
    const id = req.params.commentId;
    let comment = await commentServices.getComment(id);
    res.status(200).json(comment);
});

const updateComment = asyncHandler(async(req,res)=> {
    
    const commentId = req.params.commentId;
    const newContent=req.body.commentContent;
    let updated = await commentServices.updateComment(commentId,req.user,newContent);
    res.status(200).json(updated);
    
});

const deleteComment = asyncHandler(async(req,res)=> {
    const commentId = req.params.commentId;
    let deleted = await commentServices.deleteComment(commentId,req.user);
    res.status(200).json(deleted);
});

module.exports = {
    addComment,
    getComments,
    updateComment,
    deleteComment,
    getComment
};