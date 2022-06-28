import React, { useState } from "react";
import { useEffect } from "react";
import Logo from "../assets/logo/logo.png";
import "../pages/style.css";

function Contacts({ contacts, currentUser }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  return (
    <>
      {currentUserImage && currentUserName && (
        <div>
          <div>
            <img src={Logo} alt="logo" width="100px"/>
            <h3>snappy</h3>
          </div>
          <div>
            {contacts.map((contact, index) => (
              <div
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                key={index}
              >
                <div>
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt="avatar"
                    width="100px"
                  />
                </div>
                <div>
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div>
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
                width="120px"
              />
            </div>
            <div>
              <h1>{currentUserName}</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Contacts;
