const { User } = require("../models");

module.exports = {
  create(data) {
    return User.create(data);
  },

  findByEmail(email) {
    return User.findOne({ email });
  },

  findById(id) {
    return User.findById(id);
  },
};
