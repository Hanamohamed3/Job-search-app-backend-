import { Router } from "express";
import { register,login } from "./user.controller.js";
import { check } from "../../middleware/check.js";
const userRoutes = Router();




userRoutes.post("/register",register,check)
userRoutes.post("/login",login)







export default userRoutes;