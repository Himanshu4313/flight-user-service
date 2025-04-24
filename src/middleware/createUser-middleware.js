const { StatusCodes } = require("http-status-codes");

async function createUserValidate(req,res,next){
   if(!req.body.fullName){
      return res.status(StatusCodes.BAD_REQUEST).json({
         message:"FullName is missing in incoming request body"
      })
   }
   if(!req.body.email){
    return res.status(StatusCodes.BAD_REQUEST).json({
        message:"email is missing in incoming request body"
     })
   }
   if(!req.body.password){
    return res.status(StatusCodes.BAD_REQUEST).json({
        message:"password is missing in incoming request body"
     })
   }
   if(!req.body.phoneNumber){
    return res.status(StatusCodes.BAD_REQUEST).json({
        message:"phoneNumber is missing in incoming request body"
     })
   }

   next();
}

module.exports = {
    createUserValidate
}