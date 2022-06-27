import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, InputAdornment, TextField } from "@mui/material";
// import { Lock, User, Mail } from "react-feather";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute, loginRoute } from "../utils/APIRoutes";

function SetAvatar() {
  const api = "https://api.multiavatar.com/45678945";

  return <div>SetAvatar</div>;
}

export default SetAvatar;
