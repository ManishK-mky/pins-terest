require("dotenv").config();
require('express-async-errors');

const connectDB = require("./db/connect");
const express = require("express");
const cors = require('cors');
const path = require("path");
const mainRouter = require("./routes/user");

const app = express();

app.use(express.json());
app.use(cors());

// Serve static files from the 'public/uploads' folder
// app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use("/api/v1", mainRouter);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(mongoDB-uri);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
