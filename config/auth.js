function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated) {
    return next();
  } else {
    return next();
  }
}

module.exports = {
  ensureAuthenticated,
};
