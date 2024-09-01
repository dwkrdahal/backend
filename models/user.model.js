import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin", "engineer", "new"],
      default: "new",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    fullName: String,
    contactNumber: String,
    address: String,
    avatar: String,
  },
  {
    timestamps: true,
  }
);

//password hashing
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

//compare password
userSchema.methods.comparePassword = function (password) {
  try {
    return bcrypt.compare(password, this.password);
  } catch (error) {
    console.log(error);
  }
};

//generate token
userSchema.methods.generateToken = function () {
  try {
    return jwt.sign(
      {
        userid: this._id.toString(),
        username: this.username,
        role: this.role,
        status: this.status,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
  } catch (error) {
    console.log("error generating token",error);
  }
};

const User = mongoose.model("User", userSchema);
export default User;
