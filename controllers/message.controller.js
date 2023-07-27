const Message = require('../models/message');
const Discussion = require('../models/disccusion');

async function createMessage(req,res) {
    try {
        const getDis = await Discussion.findById(req.body.discussionId)

        if (!getDis)
            return new Error('Failed to get discussion')


        const newMessage = new Message({
            sender: req.user._id,
            content: req.body.content,
            discussion: req.body.discussionId,
        });

        getDis.messages.push(newMessage._id)
        await getDis.save();
        const savedMessage = await newMessage.save();
        return res.status(200).json({ savedMessage })

    } catch (error) {
        // Handle error
        console.error(error);
        return res.status(404).json({ msg: "Failed to create Message" })

    }
}

async function getMessagesInDiscussion(req,res) {
    try {
        const messages = await Message.findOne({ _id:req.params.messageId }).populate('sender');
        return res.status(200).json({ messages})

        return messages;
    } catch (error) {
        // Handle error
        console.error(error);
        return res.status(404).json({ msg: "Failed to get Disccusion" })

    }
}

async function deleteMessage(messageId) {
    try {
        const deletedMessage = await Message.findByIdAndDelete(req.params.messageId);
        return res.status(200).json({ deletedMessage})
    } catch (error) {
        // Handle error
        console.error(error);
        return res.status(404).json({ msg: "Failed to delete Disccusion" })

    }
}

module.exports = {
    createMessage,
    getMessagesInDiscussion,
    deleteMessage
}