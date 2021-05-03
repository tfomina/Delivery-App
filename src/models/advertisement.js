const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { requiredMessage } = require("../helper");

const AdvertisementSchema = new Schema({
  shortTitle: {
    type: String,
    required: [true, requiredMessage],
  },
  description: String,
  images: [String],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, requiredMessage],
  },
  createdAt: { type: Date, required: [true, requiredMessage] },
  updatedAt: { type: Date, required: [true, requiredMessage] },
  tags: [String],
  isDeleted: {
    type: Boolean,
    required: [true, requiredMessage],
  },
});

const Advertisement = mongoose.model("Advertisement ", AdvertisementSchema);

module.exports = Advertisement;
