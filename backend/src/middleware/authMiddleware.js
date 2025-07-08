import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function protect(req, res, next) {
  try {
    let token = "";

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    }

    if (!token) {
      res.status(401);
      throw new Error("Missing token");
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Not authorized", error: error.message });
  }
}
