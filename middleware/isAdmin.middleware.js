const createError = require("http-errors");
const authMiddleware = require("./auth.middleware");
const User = require("../models/user");

module.exports = [
  authMiddleware,
  async (req, res, next) => {
    const user = await User.findOne({ _id: req.user._id, role: "ADMIN" });
    if (!user) {
      next(createError(401));
      return;
    }

    req.user = user;
    req.role = user.role;

    next();
  },
];
