import User from "../models/user.model.js";

class userController {
  getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select("-password");
      if (!users) {
        return res.status(404).json({
          result: null,
          msg: "user not found",
          status: false,
        });
      } else {
        return res.json({
          result: users,
          msg: "user fetched",
          count: users.length,
          status: true,
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

  getUserById = async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id).select("-password");
      if (!user) {
        return res.status(404).json({
          result: null,
          msg: "User not found",
          status: false,
        });
      } else {
        res.status(200).json({
          result: user,
          msg: "success",
          status: true,
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

  deleteUserById = async (req, res) => {
    try {
      const id = req.params.id;
       
      // cannot delete currently logged in user
      if(id == req.user._id){
        return res.status(401).json({
          result: null,
          status: false,
          msg: "you cannot deleted logged in user!"
        })
      }

      const user = await User.findByIdAndDelete(id);

      if (!user) {
        return res.status(404).json({
          result: null,
          msg: "user not found",
          status: false,
        });
      } else {
        res.status(200).json({
          result: user,
          msg: "deleted successfully",
          status: true,
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

  updateUserById = async (req, res) => {
    try {
      const data = req.body;
      const id = req.params.id;

      const user = await User.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      }).select('-password');

      if (!user) {
        return res.status(404).json({
          result: null,
          msg: "User not found",
          status: false,
        });
      } else {
        res.status(200).json({
          result: user,
          msg: "update success",
          status: true,
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

export default userController;
