const User = require("../models");

module.exports = {
  async create(data) {
    const user = new User(data);
    return user.save();
  },

  async findByEmail(email) {
    return User.findOne({ email });
  },
};
