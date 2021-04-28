const User = require("../models");

module.exports = {
  create(req, res) {
    const data = req.body;

    return User.create(data).then((user) => user);
  },
};
