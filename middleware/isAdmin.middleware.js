const createError = require("http-errors");
const authMiddleware = require("./auth.middleware");

module.exports = [
  authMiddleware,
  (req, res, next) => {
    if (req.role !== "ADMIN") {
      next(createError(401));
    }

    next();
  },
];
