module.exports = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.send({
      error: "Войдите или зарегистрируйтесь",
      status: "error",
    });
  }
  next();
};
