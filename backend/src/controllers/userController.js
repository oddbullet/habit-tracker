import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * @description Register a user account.
 * @route POST api/user
 * @access Public
 */
export async function registerUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      password: hashPassword,
    });

    await user.save();
    res
      .status(201)
      .json({ id: user.id, email: user.email, token: generateToken(user.id) });
  } catch (error) {
    console.log("Error in registerUser controller", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

/**
 * @description Authenticate a user account.
 * @route POST api/user/login
 * @access Public
 */
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log("Error in loginUser controller", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

/**
 * @description Get user Data
 * @route Get api/user/me
 * @access Private
 */
export async function getMe(req, res) {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

/**
 * @description Get user Data
 * @route Get api/user/verify
 * @access Private
 */
export async function verifyUser(req, res) {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}
