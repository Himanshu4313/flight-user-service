const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

// Booking server url

const BookingServerURL = process.env.BOOKING_SERVER_URL;
const FlightServerURL = process.env.FLIGHT_SERVER_URL;

async function bookingDetails(userId) {
  try {
    const result = await axios.get(
      `${BookingServerURL}/api/v1/booking/booking-details/${userId}`
    );


    const bookings = result.data.data; // Extract array from response
    // Map through bookings and fetch flight details for each
    const bookingsWithFlightDetails = await Promise.all(
        bookings.map(async (booking) => {
        try {
          const flightRes = await axios.get(
            `${FlightServerURL}/api/v1/flights/${booking.flightId}`
          );
          const flightDetails = flightRes.data;

          return {
            ...booking, // convert Sequelize instance to plain object
            flightDetails: flightDetails.data || null,
          };
        } catch (err) {
          console.error("Error fetching flight:", err.message);
          return {
            ...booking,
            flightDetails: null,
          };
        }
      })
    );

    return bookingsWithFlightDetails ;
  } catch (error) {
    console.log("Error :-", error.message);
    throw error;
  }
}

module.exports = {
  bookingDetails,
};
