const { StatusCodes } = require("http-status-codes");

async function loginUserValidate(req, res, next) {
  if (!req.body.email) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "email is missing in incoming request body",
    });
  }
  if (!req.body.password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "password is missing in incoming request body",
    });
  }

  next();
}

module.exports = {
    loginUserValidate,
};
