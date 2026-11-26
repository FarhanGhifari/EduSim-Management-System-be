const errorHandler = (err, req, res, next) => {
  if (err.statusCode) {
    const response = {
      status: err.statusCode >= 500 ? "error" : "failed",
      message: err.message,
    };

    if (err.errors && Array.isArray(err.errors)) {
      response.errors = err.errors;
    }

    return res.status(err.statusCode).json(response);
  }

  if (err.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        status: "failed",
        message: "Ukuran file terlalu besar. Maksimal 100 MB per file.",
      });
    }
    return res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }

  console.error("Unexpected error:", err);
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};

module.exports = errorHandler;
