function ensureAuthenticated(req, res, next) {
  let authenticatedUser = false;
  if (req.isAuthenticated) {
    authenticatedUser = true;
    res.locals.authenticatedUser = authenticatedUser;
    return next();
  } else {
    authenticatedUser = false;
    return next();
  }
}

module.exports = {
  ensureAuthenticated,
};
