require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const databaseURL = process.env.DATABASE_URL;
const routes = require("./routes/routes");
const port = 8080;

const serverDB = async () => {
  try {
    const conDB = await mongoose.connect(databaseURL, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected : ${conDB.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
const db = mongoose.connection;

db.on("open", () => {
  console.log("Connected.....");
});

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", routes);
serverDB().then(() => {
  app.listen(port, () => {
    console.log(`Server Started at ${port}`);
  });
});
