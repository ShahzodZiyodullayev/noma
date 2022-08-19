import { Grid } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { allUsersRoute } from "../utils/APIRoutes";
import "./style.css";

function Chat() {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/register");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
      setIsLoaded(true);
    }
  }, []);

  const curUser = async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data.users);
      } else {
        navigate("/setAvatar");
      }
    }
  };

  useEffect(() => {
    curUser();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  console.log();

  return (
    <div className="chat">
      <Grid container md={11} className="content">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer currentChat={currentChat} currentUser={currentUser} />
        )}
      </Grid>
    </div>
  );
}

export default Chat;
