import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, InputAdornment, TextField } from "@mui/material";
// import { Lock, User, Mail } from "react-feather";
import "./style.css";
import loader from "../assets/logo/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute, loginRoute, setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";

function SetAvatar() {
  const api = "https://api.multiavatar.com";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastifyOption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
  };

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/register");
    }
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastifyOption);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      let data;
      console.log("user", user);
      if (user) {
        data = await axios.post(`${setAvatarRoute}/${user._id}`, {
          image: avatars[selectedAvatar],
        });
      }
      console.log("data", data);

      if (data && data.data) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again", toastifyOption);
      }
    }
  };
  const getProfilePicture = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `https://api.multiavatar.com/${JSON.stringify(
          Math.round(Math.random() * 1000),
        )}?apikey=lfuCEIemOY75jc`,
      );
      const buffer = new Buffer(image.data);
      // console.log(buffer);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getProfilePicture();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <img src={loader} alt="loader" />
        </div>
      ) : (
        ""
      )}
      <div className="setAvatar">
        <div className="yourProfilePicture">
          <p>Pick an avatar as your profile picture</p>
        </div>
        <div className="avatarContainer">
          {avatars.map((avatar, index) => {
            return (
              <div
                key={index}
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  width="80px"
                  height="80px"
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            );
          })}
        </div>
        <button
          className="submitBtn"
          style={{
            padding: "10px 30px",
            border: "1px solid white",
            color: "white",
          }}
          onClick={() => setProfilePicture()}
        >
          Set as Profile Picture
        </button>
        <ToastContainer />
      </div>
    </>
  );
}

export default SetAvatar;
