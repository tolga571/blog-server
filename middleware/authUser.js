import jwt from "jsonwebtoken";
import config from "config";
import User from "../models/User.js";
import ROLES from './roles.js'

const auth = async (req, res, next) => {
  // Get token from header
  debugger;

  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
 
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;

    const user = await User.findById(decoded.user.id).select("-password");
  

    // Check if user has the "user" role ayrıca bu alanı ayrı bir middleware'de tut
    if (user.roles === ROLES.user) {
      next();
    } else {
      res.status(401).json({ msg: "Unauthorized - User role required" });
    }

  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default auth;
