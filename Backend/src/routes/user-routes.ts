import { Router } from "express";
import { getAllUsers,userLogin,userLogOut,userSignup, verifyUser } from "../controllers/user-controllers.js";
import { loginValidator, signupValidator,validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";
const userRoutes = Router()

userRoutes.get("/",getAllUsers ) //we need to add controllers handlers here. Therefore we use a separate directory for defining the controllers
userRoutes.post('/signup',validate(signupValidator),userSignup);
userRoutes.post('/login',validate(loginValidator),userLogin);
userRoutes.get('/auth-status',verifyToken,verifyUser);
userRoutes.get('/log-out',verifyToken,userLogOut);

export default userRoutes; 