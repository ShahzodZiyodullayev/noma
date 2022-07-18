import React, { useState } from "react";
import { useEffect } from "react";
import Logo from "../assets/logo/logo.png";
import "../pages/style.css";
import { Grid, Typography } from "@mui/material";

function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <Grid item md={3}>
      {currentUserName && (
        <div className="leftSide">
          <div className="logoContainer">
            <Typography
              className="mess"
              fontFamily="Monoton, Cursive"
              fontSize="50px"
            >
              Message
            </Typography>
          </div>
          <div>
            {contacts.map((contact, index) => (
              <div
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                key={index}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div>
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt="avatar"
                    width="100px"
                  />
                </div>
                <div>
                  <p>{contact.username}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="myContact">
            <div>
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
                width="120px"
              />
            </div>
            <div>
              <p>{currentUserName}</p>
            </div>
          </div>
        </div>
      )}
    </Grid>
  );
}

export default Contacts;
