import jwt from "jsonwebtoken";
import "dotenv/config";

//generateToken
export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
  };
  