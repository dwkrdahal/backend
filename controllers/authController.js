import User from "../models/user.model.js";
import jwt from "jsonwebtoken"

class authController {
  login = async (req, res, next) => {
    try {
      const data = req.body;
      const userExist = await User.findOne({ username: data.username });
      const emailExist = await User.findOne({ email: data.username });

      if (!(userExist || emailExist)) {
        return res.status(400).json({ 
          result: null,
          status: false,
          msg: "invalid user" 
        });
      }

      const user = userExist || emailExist
      const isPasswordValid = await user.comparePassword(data.password)

      if(isPasswordValid){
        res.json({
          result: user,
          status: true,
          msg: "login successful",
          token: await user.generateToken()
        })
      } else{
        return res.status(400).json({ 
          result: null,
          status: false,
          msg: "invalid password" 
        })
      }

    } catch (error) {
      res.status(400).json({
        result: error,
        status: false,
        msg: error.message,
      });
    }
  }

  register = async (req, res, next) => {
    const data = req.body;
    try {
      //if username available or not
      const usernameExist = await User.findOne({ username: data.username });
      if (usernameExist) {
        return res.status(400).json({
          result: null,
          status: false,
          msg: "username already taken",
        });
      }

      //if email exists
      const emailExist = await User.findOne({ email: data.email });
      if (emailExist) {
        return res.status(400).json({
          result: null,
          status: false,
          msg: "email address already registered",
        });
      }

      const user = new User(data);
      await user.save();

      if (user) {
        res.status(201).json({
          result: user,
          status: true,
          msg: "registration successfull",
        });
      } else {
        return res.status(400).json({
          result: null,
          status: false,
          msg: "registration failed",
        });
      }
    } catch (error) {
      res.status(400).json({
        result: error,
        status: false,
        msg: error.message,
      });
    }
  };
}

export default authController;
