const dotenv = require("dotenv");
dotenv.config();
const { StatusCodes } = require("http-status-codes");
const { userService } = require("../services");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET_KEY = process.env.SECRET_KEY;

async function createUser(req, res) {
  try {
    const User = await userService.createUser({
      fullName: req.body.fullName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User Created Successfully",
      data: User,
      error: {},
    });
  } catch (error) {
    if (error.name == "SequelizeUniqueConstraintError") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "User Already Registered",
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong while loggedIn ",
      data: {},
      error: error,
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email);

    const userDetails = {
      id: user.id,
      name: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };

    if (user == null) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid Credential.Please enter registered emailId",
      });
    }

    // if user !== null then do match the password

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Password Incorrect",
      });
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true, // prevents JS access to the cookie
      //   secure: process.env.NODE_ENV === "production", // send only on https in prod
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "LogIn Successfully",
      data: userDetails,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong while login ",
      data: {},
      error: error,
    });
  }
}

async function logout(req, res) {
  try {
    const userDetails = req.user;

    console.log("user Details", userDetails);

    if (!userDetails) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "NOT USER EXIST",
      });
    }

    res.cookie("token", null, {
      httpOnly: true,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Logged Out Successfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong while logout the user ",
      data: {},
      error: error,
    });
  }
}

async function getUser(req, res) {
  try {
    const user = await userService.getUserId(req.params.id);

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "User is not found",
      });
    }

    const userDetails = {
      id: user.id,
      name: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User Found",
      data: userDetails,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong while getting the user ",
      data: {},
      error: error,
    });
  }
}

module.exports = {
  createUser,
  login,
  logout,
  getUser,
};
