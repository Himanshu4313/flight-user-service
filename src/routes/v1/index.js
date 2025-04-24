const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { info } = require("../../controllers");

const router = express.Router();

router.use("/info", info.info);

module.exports = router;
