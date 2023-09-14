const Contact = require("../models/contact.model");

const createNewContactMessage = async (data) => {
  return await Contact.create(data);
};

const getContactMessages = async () => {
  return await Contact.find().select("-message");
};

const getContactMessageById = async (id) => {
  return await Contact.findById(id);
};

const deleteContactMessageById = async (id) => {
  return await Contact.findByIdAndDelete(id);
};

module.exports = {
  createNewContactMessage,
  getContactMessages,
  getContactMessageById,
  deleteContactMessageById,
};
