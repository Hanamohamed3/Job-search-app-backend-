import express from 'express';
import {  aacountsByRec, deleteUser, forgetPassword, getDataForDiffUser, getSpecificAccData, signIn, signup, updatePassword, updateUser } from './user.controller.js';
import { checkEmail } from '../../middleware/checkEmail.js';
import { signupValidation } from './user.validation.js';
import { validate } from '../../middleware/validation.js';
import { verifyToken } from './../../middleware/verifyToken.js';


const userRoutes=express.Router();


userRoutes.post("/signup",validate(signupValidation),checkEmail,signup)
userRoutes.post("/signin",signIn)
userRoutes.put("/update/:id",verifyToken,updateUser)
userRoutes.delete("/delete/:id",verifyToken,deleteUser)
userRoutes.get("/user",verifyToken,getSpecificAccData)
userRoutes.get("/user/:id",verifyToken,getDataForDiffUser)
userRoutes.put("/updatepassword/:id",updatePassword)
userRoutes.post("/reset",forgetPassword)
userRoutes.get("/recovery",aacountsByRec)




export default userRoutes