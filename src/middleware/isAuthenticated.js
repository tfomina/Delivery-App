module.exports = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).send({
      error: "Войдите или зарегистрируйтесь",
      status: "error",
    });
  }
  next();
};
