module.exports = Logger => (err, req, res, next) => {
  if (err) {
    Logger.error(err);
    return res.status(500).json({ Error: 'Internal Server Error' });
  }
  return next(req, res, next);
};
