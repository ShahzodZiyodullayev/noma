import React from "react";
import Logout from "./Logout";
import "../pages/style.css";
import { Grid } from "@mui/material";
import ChatInput from "./ChatInput";
import Messages from "./Messages";

function ChatContainer({ currentChat }) {
  const handleSendMsg = async (msg) => {
    alert(msg);
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
      <Messages />
      <ChatInput handleSendMsg={handleSendMsg} />
    </Grid>
  );
}

export default ChatContainer;
