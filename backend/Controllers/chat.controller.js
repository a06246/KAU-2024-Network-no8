const Chat = require("../Models/chat");
const chatController = {}

chatController.saveChat = async (chatText, user, imageUrl = "") => {

    console.log("📦 저장 요청:", chatText, imageUrl);
    const newMessage = new Chat({
        chat: chatText || "",
        image: imageUrl || "",
        user: {
            id: user._id,
            name: user.name,
        },
    });
    await newMessage.save();
    return newMessage;
}

module.exports = chatController