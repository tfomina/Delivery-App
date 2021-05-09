const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MessageSchema = require("./message");
const { requiredMessage } = require("../helper");

const ChatSchema = new Schema({
  users: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    required: [true, requiredMessage],
    validate: {
      validator: (users) => users.length === 2,
      message: "Должно быть 2 пользователя",
    },
  },
  createdAt: { type: Date, required: [true, requiredMessage] },
  messages: [MessageSchema],
});

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
