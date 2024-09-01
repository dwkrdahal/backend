import express from "express";
const router = express.Router();

//importing controller
import userController from "../controllers/userController.js"
const userCtrl = new userController()


router.get('/', userCtrl.getAllUsers)
router.get('/:id', userCtrl.getUserById)
router.patch('/edit/:id', userCtrl.updateUserById)
router.delete('/delete/:id', userCtrl.deleteUserById)

export default router;