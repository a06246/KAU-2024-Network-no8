import { useEffect, useState } from "react";
import "./App.css";
import socket from "./server";
import InputField from "./components/InputField/InputField";
import MessageContainer from "./components/MessageContainer/MessageContainer";

function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('')
  const [messageList, setMessageList] = useState([]);
  console.log("message List", messageList);


  useEffect(() => {
    socket.on("message", (message) => {
      console.log("✅ 받은 메시지: ", message);

      setMessageList((prevState) => prevState.concat(message));
    });
    askUserName();
  }, []);

  const askUserName = () => {
    const userName = prompt("이름을 입력해주세요.");

    socket.emit("login", userName, (res) => {
      if (res?.ok) {
        setUser(res.data);
      }
    });
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (!message.trim()) return;

    socket.emit("sendMessage",
      {
        chat: message,
        image: ""
      },
      (res) => {
        console.log("sendMessage res", res);
      });
    setMessage("");
  };

  const sendImage = (imageUrl) => {
    if (!user) return;

    console.log("이미지 전송 시도: ", imageUrl);

    socket.emit("sendMessage", {
      chat: "",
      image: imageUrl,
    },
      (res) => {
        console.log("sendImage 응답:", res);
      }
    );
  };

  return (
    <div>
      <div className="App">
        <MessageContainer messageList={messageList} user={user} />
        <InputField
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          sendImage={sendImage}
        />
      </div>
    </div>
  );
}

export default App;
