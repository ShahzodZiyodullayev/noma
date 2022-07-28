import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import { Grid } from "@mui/material";

function ChatInput() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <Grid className="chatInputRow">
      <Grid className="button-container">
        <Grid className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
        </Grid>
      </Grid>
      <Grid className="emojies">{showEmojiPicker && <Picker />}</Grid>
      <form className="input-container">
        <input type="text" placeholder="Type your message here" />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Grid>
  );
}

export default ChatInput;
