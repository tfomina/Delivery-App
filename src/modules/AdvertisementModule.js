const { Advertisement } = require("../models");

module.exports = {
  findById(id) {
    return Advertisement.findById(id);
  },

  create(data) {
    const advertisement = new Advertisement(data);
    return advertisement.save();
  },

  find(params) {
    return Advertisement.find(buildFilterQuery(params));
  },

  remove(id) {
    return Advertisement.findByIdAndUpdate(id, {
      $set: { isDeleted: true },
    });
  },
};

const buildFilterQuery = (params) => {
  const { shortTitle, description, userId, tags } = params;

  const query = {};

  if (shortTitle) {
    query.shortTitle = { $regex: new RegExp(shortTitle), $options: "i" };
  }

  if (description) {
    query.description = { $regex: new RegExp(description), $options: "i" };
  }

  if (userId) {
    query.userId = userId;
  }

  if (tags) {
    query.tags = { $all: tags };
  }

  query.isDeleted = false;

  return query;
};
