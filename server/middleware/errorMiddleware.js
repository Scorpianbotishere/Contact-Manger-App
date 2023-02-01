const errorHandler = (err, req, res, next) => {
  const Status = res.Status ? res.Status : 500;
  res.status(Status).json({
    message: err.message,
    stack: process.env.NODE_ENV == "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
