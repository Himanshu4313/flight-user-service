const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const { StatusCodes } = require("http-status-codes");
dotenv.config();

const SECRETKEY = process.env.SECRET_KEY;

async function jwtTokenVarify(req, res, next) {
  
const {token} = req.cookies;

 
    if(!token){
            return res.status(StatusCodes.BAD_REQUEST).json({
                success:false,
                message:"Not authorized user"             
            })
    }

    try {
      
      const userDetails =  jwt.verify(token,SECRETKEY);
      req.user = userDetails;

      next();

    } catch (error) {
      console.log('JWT Token Verify Error',error.message);
      throw error;
    }

}

module.exports = {
  jwtTokenVarify,
};
