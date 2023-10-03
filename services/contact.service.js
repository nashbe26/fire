const Contact = require("../models/contact.model");

const createNewContactMessage = async (data) => {
  return await Contact.create(data);
};

const getContactMessages = async () => {
  return await Contact.find().select("-__v");
};

const getContactMessageById = async (id) => {
  return await Contact.findById(id);
};

const deleteContactMessages = async (id) => {
  return await Contact.deleteMany({ _id: { $in: id } });
};

module.exports = {
  createNewContactMessage,
  getContactMessages,
  getContactMessageById,
  deleteContactMessages,
};
