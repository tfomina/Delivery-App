const User = require("../models");

module.exports = {
  create(data) {
    return User.create(data).then((user) => user);
  },

  findByEmail(email) {
    return User.findOne({ email: email }).then((user) => user);
  },
};
