const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const {
    createEnroll,
    getEnrollById,
    getEnrolls,
    deleteEnroll,
} = require("../services/enroll.service");

const createNewEnrollController = asyncHandler(async (req, res, next) => {
    if (!req.body.message) next(createError(400));
    const message = await createEnroll(req.body.message);
    return res.json({ message });
});

const getEnrollsController = asyncHandler(async (req, res) => {
    const messages = await getEnrolls();
    return res.json({ messages });
});

const getEnrollByIdController = asyncHandler(async (req, res) => {
    const message = await getEnrollById(req.params.id);
    return res.json({ message });
});

const deleteEnrollController = asyncHandler(async (req, res) => {
    await deleteEnroll(req.params.id);
    return res.json({ success: true });
});

module.exports = {
    createNewEnrollController,
    getEnrollsController,
    getEnrollByIdController,
    deleteEnrollController,
};
