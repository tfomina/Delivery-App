const { Chat } = require("../models");

module.exports = {
  find(users) {
    return Chat.findOne({ users: { $all: users } }).populate("users", {
      _id: 1,
      name: 1,
    });
  },

  async sendMessage(data) {
    const { author, receiver, text } = data;

    const currentDate = new Date().toISOString();

    try {
      const chat = await Chat.findOne({ users: { $all: [author, receiver] } });

      if (chat) {
        return Chat.findByIdAndUpdate(
          { _id: chat._id },
          {
            $push: {
              messages: { author, text, sentAt: currentDate },
            },
          }
        );
      } else {
        return Chat.create({
          users: [author, receiver],
          text,
          createdAt: currentDate,
          messages: [{ author, text, sentAt: currentDate }],
        });
      }
    } catch (err) {
      console.log(err);

      return null;
    }
  },

  // TODO Реализовать
  subscribe(data) {},

  getHistory(id) {
    return Chat.findById(id).select("messages").populate("messages.author", {
      _id: 1,
      name: 1,
    });
  },
};
