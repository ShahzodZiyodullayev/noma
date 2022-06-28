import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Contacts from "../components/Contacts";
import { allUsersRoute } from "../utils/APIRoutes";
import "./style.css";

function Chat() {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/register");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
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

  return (
    <div className="chat">
      <div className="content">
        <Contacts contacts={contacts} currentUser={currentUser} />
      </div>
    </div>
  );
}

export default Chat;
