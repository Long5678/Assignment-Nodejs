import express from "express";
import authController from "../app/Controllers/AuthController.js";

const router = express.Router();


router.post('/register', authController.register); // localhost:3000/auth/register
router.post('/login', authController.login); // localhost:3000/auth/login
router.get('/', authController.index)
router.get('/register', authController.registerForm);  // show register form
router.get('/logout', authController.logout);     // log out user
export default router;