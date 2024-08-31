import User from "../models/user.model.js";

class userController {

  getAllUsers = async (req, res) => {
    try {
      const users = await User.find()
      if(!users){
        return res.status(404).json({
          result: null,
          msg: "user not found",
          status: false
        })
      } else{
        return res.json({
          result: users,
          msg: "user fetched",
          count: users.length,
          status: true
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

  
}

export default userController;