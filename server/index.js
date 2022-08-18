const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRouter = require("./routes/userRouter");
const messagesRouter = require("./routes/messagesRouter");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api/messages", messagesRouter);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection Successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
  console.log(`Server started on port ${PORT}`);
});
