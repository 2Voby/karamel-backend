const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./authRouter");
const corsSettings = require("./middelwares/cosrSettings");
const cors = require("cors");
const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors());
// app.use(corsSettings);
app.use("/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://karamel:karameladmin@karamel-db.0o0k2nm.mongodb.net/"
    );
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT} port`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
