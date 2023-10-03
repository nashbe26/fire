const Enroll = require("../models/enroll.model");
const createEnroll = async (message) => {
    return await Enroll.create({ message });
};

const getEnrollById = async (id) => {
    return await Enroll.findById(id);
};

const getEnrolls = async () => {
    return await Enroll.find();
};

const deleteEnroll = async (id) => {
    return await Enroll.findByIdAndDelete(id);
};

module.exports = {
    createEnroll,
    getEnrollById,
    getEnrolls,
    deleteEnroll,
};
