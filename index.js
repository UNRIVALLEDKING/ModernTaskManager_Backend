require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const databaseURL = process.env.DATABASE_URL;
const routes = require("./routes/routes");
const port = 8080;

mongoose.connect(databaseURL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("open", () => {
  console.log("Connected.....");
});

const app = express();
app.use(express.json());
app.use("/moderntodo-api", routes);
app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
