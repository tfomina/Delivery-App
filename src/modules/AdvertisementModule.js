const { Advertisement } = require("../models");

module.exports = {
  getOne(id) {
    return Advertisement.findById(id)
      .select("shortTitle description images createdAt")
      .populate("user", { _id: 1, name: 1 });
  },

  create(data) {
    const advertisement = new Advertisement(data);
    return advertisement.save();
  },

  find(params) {
    return Advertisement.find(buildFilterQuery(params))
      .select("shortTitle description images createdAt")
      .populate("user", {
        _id: 1,
        name: 1,
      });
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
    query.user = userId;
  }

  if (tags) {
    query.tags = { $all: tags.split(",") };
  }

  query.isDeleted = false;

  return query;
};
