// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  if (err.isOperational) {
    console.error(err.toString());

    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.error("Unknown error:", err);

  res.status(500).json({
    message: "Something went wrong!",
  });
};

module.exports = errorHandler;
