import userModel from "../../db/model/user.model.js"
import bcrypt from 'bcrypt';

// code to check if the email has been already registered or 1st time(new registeration) and to bcrypt the password when put in the DB
export const checkEmail=async (req,res,next)=>{

    let user=await userModel.findOne({email:req.body.email})
    if(user){
      return res.status(409).json({message:"you have already registered"})
    
}
req.body.password= bcrypt.hashSync(req.body.password,10)

next()
}