import express, { Router } from "express";
const router = express.Router();

import authController from "../controllers/authController.js";
const authCtrl = new authController();

router.get("/login", authCtrl.login);

router.post("/register", authCtrl.register);

export default router;
