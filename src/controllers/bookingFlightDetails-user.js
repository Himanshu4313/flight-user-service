const { StatusCodes } = require("http-status-codes");
const { bookingDetailsService } = require("../services");
async function getBookingDetails(req, res) {
  try {
    console.log("Booking controllers");

    const user = req.user;
    console.log(user);
    const details = await bookingDetailsService.bookingDetails(user.id);



    /**
     * {
     * 
     * bookingDetails : {
     * 
     * },
     * flightDetails:{
     * 
     * 
     * }
     * 
     * }
     * 
     * 
     */

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "SuccessFully Loaded BookingDetails",
      data: details,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message:
        "Something went wrong while geting flight booking details of the user ",
      error: error,
    });
  }
}

module.exports = {
  getBookingDetails,
};
