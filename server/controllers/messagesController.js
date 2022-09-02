const messageModel = require("../models/messageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    console.log(req.body);
    const data = await messageModel.create({
      message: { text: message },
      users: { from, to },
      sender: from,
    });
    if (data) return res.json({ msg: "Message added successfully!" });
    return res.json({ msg: "Failed to add message to the database!" });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    console.log(from, to);
    const messages = await messageModel
      .find({
        users: { $all: [{ from, to }] },
      })
      .sort({ createdAt: 1 });
    const projectMessages = messages.map((message) => {
      return {
        fromSelf: message.sender.toString() === from,
        message: message.message.text,
      };
    });
    return res.json(projectMessages);
  } catch (error) {
    next(error);
  }
};
