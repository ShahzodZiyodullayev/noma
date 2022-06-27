import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Typography, InputAdornment, TextField } from "@mui/material";
import { Lock, User, Mail } from "react-feather";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

function Register() {
  const [isActive, setIsActive] = useState(true);
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const toastifyOption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = value;
    if (password !== confirmPassword) {
      toast.error(
        "password and confirm pasword should be same.",
        toastifyOption,
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters",
        toastifyOption,
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters",
        toastifyOption,
      );
      return false;
    } else if (email === "") {
      toast.error("email is required", toastifyOption);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = value;
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/register",
        {
          username,
          email,
          password,
        },
      );
      if (data.status === false) {
        toast.error(data.msg, toastifyOption);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      }
      navigate("/");
    }
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const activate = (e) => {
    if ([...e.target.classList].includes("false")) {
      setIsActive(!isActive);
    } else {
      setIsActive(isActive);
    }
  };

  return (
    <Grid container>
      <Grid item md={4} className={"leftSide"}>
        <Grid className="gradient"></Grid>
        <img
          src={require("../assets/image/msg.jpg")}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item md={8} className={"rightSide"}>
        <Grid className="signInSignUp">
          <Grid
            className={"activeBackground"}
            sx={{
              top: !isActive ? "50%" : 0,
            }}
          ></Grid>
          <Typography
            onClick={(e) => activate(e)}
            className={`${"isActive"} ${isActive}`}
            fontSize={20}
            sx={{
              color: isActive ? "black" : "white",
              fontFamily: "Josefin Sans, sans-serif",
            }}
          >
            Log In
          </Typography>
          <Typography
            onClick={(e) => activate(e)}
            className={`${"isActive"} ${!isActive}`}
            fontSize={20}
            sx={{
              color: !isActive ? "black" : "white",
              fontFamily: "Josefin Sans, sans-serif",
            }}
          >
            Sign Up
          </Typography>
        </Grid>
        <form onSubmit={(e) => handleSubmit(e)} className={"form"}>
          <Typography
            className="mess"
            fontFamily="Monoton, Cursive"
            fontSize="100px"
          >
            Message
          </Typography>
          <TextField
            className={isActive ? "hide" : "show"}
            id="input-with-icon-textfield"
            placeholder="Username"
            type="text"
            name="username"
            onChange={(e) => handleChange(e)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <User size={20} color="#A2A2A2" />
                </InputAdornment>
              ),
            }}
            variant="standard"
            sx={{ m: isActive ? 0 : "20px 0" }}
          />
          <TextField
            className="input"
            id="input-with-icon-textfield"
            placeholder="Email"
            type="email"
            name="email"
            onChange={(e) => handleChange(e)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail size={20} color="#A2A2A2" />
                </InputAdornment>
              ),
            }}
            variant="standard"
            sx={{ m: "20px 0" }}
          />
          <TextField
            className="input"
            id="input-with-icon-textfield"
            placeholder="Password"
            type="password"
            name="password"
            onChange={(e) => handleChange(e)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock size={20} color="#A2A2A2" />
                </InputAdornment>
              ),
            }}
            variant="standard"
            sx={{ m: "20px 0" }}
          />
          <TextField
            className={isActive ? "hide" : "show"}
            id="input-with-icon-textfield"
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock size={20} color="#A2A2A2" />
                </InputAdornment>
              ),
            }}
            variant="standard"
            sx={{ m: isActive ? 0 : "20px 0" }}
          />
          <button type="submit" className="submitBtn">
            <p className={isActive ? "login" : "createUser"}>Login</p>
            <p className={isActive ? "login" : "createUser"}>Create User</p>
          </button>
        </form>
        <ToastContainer />
      </Grid>
    </Grid>
  );
}

export default Register;
