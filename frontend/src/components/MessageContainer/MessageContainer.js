import React from "react";
import "./MessageContainer.css";
import { Container } from "@mui/system";

const MessageContainer = ({ messageList, user }) => {
  return (
    <div>
      {messageList.map((message, index) => {
        const isSystem = message.user.name === "system";
        const isMine = message.user.name === user?.name;

        return (
          <Container key={message._id || index} className="message-container">
            {isSystem ? (
              <div className="system-message-container">
                <p className="system-message">{message.chat}</p>
              </div>
            ) : isMine ? (
              <div className="my-message-container">
                <div className="my-message">
                  {message.chat && <div>{message.chat}</div>}
                  {message.image && (
                    <img
                      src={`${process.env.REACT_APP_API_URL}${message.image}`}
                      alt="chat-img"
                      style={{
                        maxWidth: "200px",
                        borderRadius: "8px",
                        marginTop: "5px",
                      }}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="your-message-container">
                <img
                  src="/profile.jpeg"
                  className="profile-image"
                  style={{
                    visibility:
                      index === 0 ||
                        messageList[index - 1].user.name !== message.user.name
                        ? "visible"
                        : "hidden",
                  }}
                  alt="profile"
                />
                <div className="your-message">
                  {message.chat && <div>{message.chat}</div>}
                  {message.image && (
                    <img
                      src={`http://localhost:5001${message.image}`}
                      alt="chat-img"
                      style={{
                        maxWidth: "200px",
                        borderRadius: "8px",
                        marginTop: "5px",
                      }}
                    />
                  )}
                </div>
              </div>
            )}
          </Container>
        );
      })}
    </div>
  );
};

export default MessageContainer;