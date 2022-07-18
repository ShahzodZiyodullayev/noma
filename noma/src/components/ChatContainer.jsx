import React from "react";
import Logout from "./Logout";
import "../pages/style.css";
import { Grid } from "@mui/material";

function ChatContainer({ currentChat }) {
  return (
    <Grid item md={9}>
      <div className="chat-header">
        <div className="user-details">
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
        </div>
        <Logout />
      </div>
      <div className="chat-message"></div>
      <div className="chat-input"></div>
    </Grid>
  );
}

export default ChatContainer;
