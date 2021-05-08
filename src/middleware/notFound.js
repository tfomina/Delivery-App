module.exports = (req, res) => {
  res.status(404).send({ status: "error", error: "Страница не найдена" });
};
