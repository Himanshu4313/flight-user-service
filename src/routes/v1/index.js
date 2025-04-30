const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { info } = require("../../controllers");
const userRoutes = require('./user-routes');
const bookingRoutes = require('./booking-routes');

const router = express.Router();

router.use("/info", info.info);
router.use("/users",userRoutes);
router.use('/booking-details',bookingRoutes)

module.exports = router;
