export const errorMiddleware = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  res.status(statusCode).json({
    result: err,
    status: false,
    message: err.message || "internal server error",
  });
}