import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, 'User name is required'],
      minlength: [3, 'User name must be at least 3 characters long'],
      maxlength: [30, 'User name must be at most 30 characters long']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [/\S+@\S+\.\S+/, 'Email is not valid'] 
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    }
  },
  { timestamps: true }
);

// password compare
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// json web token
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error generating token");
  }
};

const User = model("User", userSchema);

export default User;
