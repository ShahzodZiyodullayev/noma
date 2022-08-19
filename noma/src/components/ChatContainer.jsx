import React, { useState, useEffect } from "react";
import Logout from "./Logout";
import "../pages/style.css";
import { Grid } from "@mui/material";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { sendMessageRoute, getAllMessagesRoute } from "../utils/APIRoutes";
import axios from "axios";

function ChatContainer({ currentChat, currentUser }) {
  const [messages, setMessages] = useState([]);

  const getAllMessages = async () => {
    const response = await axios.post(getAllMessagesRoute, {
      from: currentUser._id,
      to: currentChat._id,
    });
    setMessages(response.data.messages);
  };

  useEffect(() => {
    getAllMessages();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    console.log(currentUser);
    await axios.post(sendMessageRoute, {
      message: msg,
      from: currentUser._id,
      to: currentChat._id,
    });
  };

  return (
    <Grid
      item
      md={9}
      display="flex"
      direction="column"
      justifyContent="space-between"
    >
      <Grid className="chat-header">
        <Grid className="user-details">
          {currentChat && currentChat.avatarImage && (
            <>
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </>
          )}
        </Grid>
        <Logout />
      </Grid>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div>
            <div className={`message ${msg.fromSelf ? "sended" : "received"}`}>
              <div className="content">
                <p>{msg.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Messages />
      <ChatInput handleSendMsg={handleSendMsg} />
    </Grid>
  );
}

export default ChatContainer;
