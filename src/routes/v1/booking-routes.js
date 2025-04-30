const express = require("express");
const { bookingFlightByUser } = require("../../controllers");
const { jwtTokenVarify } = require("../../middleware");

const router = express.Router();

// get booking details

// /api/v1/users/booking-details
router.get(
  "/",
  jwtTokenVarify.jwtTokenVarify,
  bookingFlightByUser.getBookingDetails
);

module.exports = router;
