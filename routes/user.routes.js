import express from "express";
const router = express.Router();

//importing controller
import userController from "../controllers/userController.js"
const userCtrl = new userController()


router.get('/', userCtrl.getAllUsers)

export default router;