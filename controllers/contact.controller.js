const { ValidationError } = require("joi");
const contactSchema = require("../validation/contact.validation");
const asyncHandler = require("express-async-handler");
const {
  createNewContactMessage,
  getContactMessages,
  getContactMessageById,
  deleteContactMessages,
} = require("../services/contact.service");

const createNewContactMessageController = asyncHandler(async (req, res) => {
  try {
    const data = await contactSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    await createNewContactMessage(data);

    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    if (error instanceof ValidationError) {
      return res.status(400).json({
        errors: error.details,
      });
    }

    throw error;
  }
});

const getContactMessagesController = asyncHandler(async (req, res) => {
  const messages = await getContactMessages();
  res.json({ messages });
});

const getContactMessageByIdController = asyncHandler(async (req, res) => {
  const message = await getContactMessageById(req.params.id);
  if (!message) {
    return res.status(404).json({
      error: "Message not found",
    });
  }
  res.json({ message });
});

const deleteContactMessageController = asyncHandler(async (req, res) => {
  await deleteContactMessages(req.body.data);
  return res.json({
    success: true,
  });
});

module.exports = {
  createNewContactMessageController,
  getContactMessagesController,
  getContactMessageByIdController,
  deleteContactMessageController,
};
