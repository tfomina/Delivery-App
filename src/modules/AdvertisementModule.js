const Advertisement = require("../models");

module.exports = {
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
  const { shortText, description, userId, tags } = params;

  const query = {};

  if (shortText) {
  }

  if (description) {
  }

  if (userId) {
    query.userId = userId;
  }

  if (tags) {
  }

  query.isDeleted = false;

  return query;
};
