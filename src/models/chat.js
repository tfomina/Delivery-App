const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MessageSchema = require("./message");
const { requiredMessage } = require("../helper");

const ChatSchema = new Schema({
  users: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    required: [true, requiredMessage],
  },
  createdAt: { type: Date, required: [true, requiredMessage] },
  messages: [MessageSchema],
});

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
