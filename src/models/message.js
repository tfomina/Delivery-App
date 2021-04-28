const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { requiredMessage } = require("../helper");

const MessageSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, requiredMessage],
  },
  sentAt: { type: Date, required: [true, requiredMessage] },
  text: { type: String, required: [true, requiredMessage] },
  readAt: Date,
});

module.exports = MessageSchema;
