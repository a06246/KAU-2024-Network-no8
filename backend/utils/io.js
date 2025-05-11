const chatController = require("../Controllers/chat.controller");
const userController = require("../Controllers/user.controller");

module.exports = function (io) {
    io.on("connection", async (socket) => {
        console.log("client is connected", socket.id);

        // 사용자 로그인
        socket.on("login", async (userName, cb) => {
            // 유저 정보 저장
            try {
                const user = await userController.saveUser(userName, socket.id);
                const welcomeMessage = {
                    chat: `${user.name} is joined to this room`,
                    user: { id: null, name: "system" },
                };
                io.emit("message", welcomeMessage);
                cb({ ok: true, data: user });
            } catch (error) {
                cb({ ok: false, error: error.message });
            }
        });

        // 메세지 전송
        socket.on("sendMessage", async (message, cb) => {

            console.log("서버가 받은 메시지: ", message);

            try {
                // Get user by socket ID
                const user = await userController.checkUser(socket.id);


                if (!user) {
                    cb({ ok: false, error: "User not authenticated. Please re-login." });
                    return;
                }

                if (!message.chat && !message.image) {
                    cb({ ok: false, error: "Empty message." });
                    return;
                }

                const saved = await chatController.saveChat(
                    message.chat,
                    user,
                    message.image
                );

                console.log("📤 io.emit 할 메시지:", saved);

                // Broadcast the message to all clients
                io.emit("message", {
                    _id: saved._id,
                    chat: saved.chat,
                    image: saved.image,
                    user: { id: user._id, name: user.name },
                });

                // Send success response to the sender
                cb({ ok: true });
            } catch (error) {
                console.error("Error in sendMessage:", error);
                cb({ ok: false, error: error.message || "Message send failed." });
            }
        });

        socket.on("disconnected", () => {
            console.log("user is disconnected");
        });
    });
};