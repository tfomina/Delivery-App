const notFoundMiddleware = require("./notFound");
const isAuthenticatedMiddleware = require("./isAuthenticated");
const saveImagesMiddleware = require("./saveImages");

module.exports = {
  notFoundMiddleware,
  isAuthenticatedMiddleware,
  saveImagesMiddleware,
};
