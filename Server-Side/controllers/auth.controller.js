import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// Register user
const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const userExisted = await User.findOne({ email });
    if (userExisted) {
      return res.status(400).json({ message: "User already exists" });
    }

    // password hashing
    const saltRounds = 10;
    const hash_password = await bcrypt.hash(password, saltRounds);

    const userCreated = await User.create({
      userName,
      email,
      password: hash_password,
    });

    // token generating
    const token = await userCreated.generateToken();

    return res.status(201).json({
      message: "Registration Successful",
      token,
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExisted = await User.findOne({ email });
    if (!userExisted) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    // password comparing
    const isPasswordMatch = await userExisted.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // token generating
    const token = await userExisted.generateToken();
    return res.status(200).json({
      message: "Login Successful",
      token,
      userId: userExisted._id.toString(),
    });
  } catch (error) {
    // console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// Get user data
const user = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json({ userData });
  } catch (error) {
    // console.error(`Error from the user route: ${error}`);
    return res.status(500).json({ message: error.message });
  }
};

export { register, login, user };
