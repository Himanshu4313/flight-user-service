const { StatusCodes } = require("http-status-codes");
const express = require("express");
const app = express();

app.use("/", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "User Server is runing out" });
});

module.exports = app;
