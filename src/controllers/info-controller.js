const { StatusCodes } = require("http-status-codes");

function info(req, res) {
  return res.status(StatusCodes.OK).json({
    Message: "User API is Alive",
  });
}

module.exports = {
  info,
};
