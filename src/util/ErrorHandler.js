const ssError = require('./SSError');

module.exports = Logger => (err, req, res, next) => {
  if (err) {
    Logger.error(err);
    if (err instanceof ssError) {
      return res.status(err.statusCode).json({ errorMessage: err.message });
    }
    return res.status(err.statusCode || 500).json({ errorMessage: err.message || 'Internal Server Error' });
  }
  return next(req, res, next);
};
