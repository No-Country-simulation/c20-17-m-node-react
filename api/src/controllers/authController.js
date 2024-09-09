import User from "../models/user.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

//generateToken
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
};

//registerUser
export const registerUser = async (req, res) => {
  console.log("entramos al api registerUser");
  const data = req.body;

  console.log(data);
  try {
    const userExists = await User.findOne({ email: data.email });

    if (userExists) {
      return res
        .status(409)
        .json({ message: "Un usuario ya existe con este correo." });
    }

    const accountType =
      data.type === "empresa" ? "company_account" : "personal_account";

    const user = await User.create({
      ...data,
      account_type: accountType,
    });

    res.status(201).json({
      message: "Su cuenta ha sido creada exitosamente.",
      /* _id: user._id,
      first_name: user.first_name,
      token: generateToken(user._id), */
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//loginUser
export const loginUser = async (req, res) => {
  const data = req.body;
  try {
    const user = await User.findOne({ email: data.email });

    if (user && (await user.matchPassword(data.password))) {
      res.json({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        account_type: user.account_type,
        account_number: user.account_number,
        user_role: user.user_role,
        account_balance: user.account_balance,
        token: generateToken(user._id),
        // vinculo a coleccion de transferencias
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//getMe
export const getMe = async (req, res) => {};
