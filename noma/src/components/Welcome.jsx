import { Grid, Typography } from "@mui/material";
import React from "react";
import Robot from "../assets/image/robot.gif";
import "../pages/style.css";

function Welcome({ currentUser }) {
  return (
    <Grid item md={9} className="rightSide">
      <img src={Robot} alt="" />
      <span className="currentUserText">
        <Typography sx={{ fontSize: "30px", lineHeight: "20px" }}>
          Welcome, {currentUser.username}
        </Typography>
        <Typography sx={{ fontSize: "20px" }}>
          Please select a chat to Start Messaging
        </Typography>
      </span>
    </Grid>
  );
}

export default Welcome;
