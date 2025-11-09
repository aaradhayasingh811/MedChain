const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let error = { ...err };
  error.message = err.message;

  // Axios error (API call failed)
  if (err.isAxiosError) {
    error.message = 'Service temporarily unavailable';
    error.statusCode = 503;
  }

  // Gemini API error
  if (err.response && err.response.data && err.response.data.error) {
    error.message = 'AI service error';
    error.statusCode = 500;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Internal Server Error'
  });
};

module.exports = errorHandler;