const { StatusCodes } = require("http-status-codes");
const express = require("express");
const app = express();

const apiRoutes = require('../src/routes');


app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.use('/api', apiRoutes);

app.use("/", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "User Server is runing out" });
});

module.exports = app;
