const { User } = require("../models");

module.exports = {
  create(data) {
    const user = new User(data);
    return user.save();
  },

  findByEmail(email) {
    return User.findOne({ email });
  },
};
