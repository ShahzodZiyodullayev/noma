import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, InputAdornment, TextField } from "@mui/material";
import { Lock, User, Mail } from "react-feather";
import styles from "./index.module.css";

function Register() {
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("form");
  };

  const handleChange = (e) => {};

  const activate = (e) => {
    if ([...e.target.classList].includes("false")) {
      setIsActive(!isActive);
    }
  };

  return (
    <Grid container>
      <Grid item md={4} className={styles.leftSide}>
        <Grid className={styles.gradient}></Grid>
        <img
          src={require("../assets/image/msg.jpg")}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item md={8} className={styles.rightSide}>
        <Grid className={styles.signInSignUp}>
          <Grid
            className={styles.activeBackground}
            sx={{
              top: !isActive ? "50%" : 0,
            }}
          ></Grid>
          <Typography
            onClick={(e) => activate(e)}
            className={`${styles.isActive} ${isActive}`}
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
            className={`${styles.isActive} ${!isActive}`}
            fontSize={20}
            sx={{
              color: !isActive ? "black" : "white",
              fontFamily: "Josefin Sans, sans-serif",
            }}
          >
            Sign Up
          </Typography>
        </Grid>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
          <Typography
            className={styles.mess}
            fontFamily="Monoton, Cursive"
            fontSize="100px"
          >
            Message
          </Typography>
          <TextField
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
            sx={{ m: "20px 0" }}
          />
          <TextField
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
          />
          <TextField
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
            id="input-with-icon-textfield"
            placeholder="Confirm Password"
            type="pasword"
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
          />
          <button type="submit" className={styles.submitBtn}>
            Create User
          </button>
          {/* <span>
            Already have an account ? <Link to="/login">Login</Link>
          </span> */}
        </form>
      </Grid>
    </Grid>
  );
}

export default Register;
