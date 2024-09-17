import User from "../models/user.js";
import otpGenerator from "otp-generator";
import Otp from "../models/otp.js";
import "dotenv/config";
import { transfers } from "../utils/transferData.js";
import { generateAlias } from "../utils/generateAias.js";


//generateToken
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
};

//generateAlias
export const generateAlias = (first_name, last_name) => {
  let alias;

  function generateRandomString(length) {
    // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.';
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789-.";

    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  if (first_name && last_name) {
    // alias = `${first_name.charAt(0)}.${last_name.substring(0, Math.min(last_name.length, 8))}`;
    alias = `${first_name.charAt(0)}${last_name.substring(
      0,
      Math.min(last_name.length, 8)
    )}.noabank`;

    //agregamos caracteres aleatorios hasta completar la longitud deseada
    while (alias.length < 6) {
      alias += generateRandomString(1);
    }
  } else {
    alias = `${first_name.substring(
      0,
      Math.min(first_name.length, 8)
    )}.noabank`;
    //agregamos caracteres aleatorios hasta completar la longitud deseada
    while (alias.length < 6) {
      alias += generateRandomString(1);
    }
  }
  // return alias;
  return alias.toLowerCase();
};

//funcion crea transfers:
const transfers = async (user) => {
  return await Transfer.aggregate([
    {
      $match: {
        $or: [{ emisor_id: user._id }, { receptor_id: user._id }],
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $limit: 10,
    },
    {
      $lookup: {
        from: "users",
        localField: "emisor_id",
        foreignField: "_id",
        as: "emisor",
      },
    },
    {
      $unwind: "$emisor",
    },
    {
      $lookup: {
        from: "users",
        localField: "receptor_id",
        foreignField: "_id",
        as: "receptor",
      },
    },
    {
      $unwind: "$receptor",
    },

    {
      $project: {
        _id: 1,
        mount: 1,
        createdAt: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        emisor: {
          firstname: "$emisor.first_name",
          lastname: "$emisor.last_name",
          emisorId: "$emisor._id",
        },
        receptor: {
          firstname: "$receptor.first_name",
          lastname: "$receptor.last_name",
          receptorId: "$receptor._id",
        },
      },
    },
  ]);
};
=======
//registerUser
export const registerUser = async (req, res) => {
  const data = req.body;

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
      alias: generateAlias(data.first_name, data.last_name),
    });

    res.status(201).json({
      message: "Su cuenta ha sido creada exitosamente."
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//loginUser version nueva
export const loginUser = async (req, res) => {
  
  if (req.body.otp) {
    try {
      const { otp } = req.body;

      //Buscar en Otp model por otp , el que sea mas reciente
      const response = await Otp.find({ otp }).sort({ createdAt: -1 }).limit(1);

      if (response.length === 0 || otp !== response[0].otp) {
        return res
          .status(401)
          .json({ message: "One Time Password inválida o expirada" });
      }

      const user = await User.findOne({ email: response[0].email });

      // Se llama a la funcion que recopila las transferencias "tranfers()"
      res.json({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        account_type: user.account_type,
        account_number: user.account_number,
        user_role: user.user_role,
        account_balance: user.account_balance,
        token: generateToken(user._id),
        transfers: await transfers(user),
      });
    } catch (err) {
      console.error("Error en login por OTP:", err);
      res.status(500).json({
        error: "Ocurrio un error en el login mediante One Time Password",
      });
    }
  }

  //login con data
  const data = req.body;
  try {
    const user = await User.findOne({ email: data.email });

    if (user && (await user.matchPassword(data.password))) {
      //verifico si es admin
      if (user.user_role === "admin") {
        res.json({
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          account_type: "",
          account_number: "",
          user_role: user.user_role,
          account_balance: 0,
          token: generateToken(user._id),
          transfers: [],
        });
      } else {
        res.json({
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          account_type: user.account_type,
          account_number: user.account_number,
          user_role: user.user_role,
          account_balance: user.account_balance,
          token: generateToken(user._id),
          transfers: await transfers(user),
        });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//updateUser para actualizar la vista home
export const updateUser = async (req, res) => {
  const { _id } = req.body;
  try {
    const user = await User.findById({ _id });

    // Se llama a la funcion que recopila las transferencias "tranfers()"
    res.json({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      account_type: user.account_type,
      account_number: user.account_number,
      user_role: user.user_role,
      account_balance: user.account_balance,
      token: generateToken(user._id),
      transfers: await transfers(user),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Forgot Password:
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    //checkea si el usuario existe
    const userExists = await User.findOne({ email: email });

    if (!userExists) {
      return res.status(404).json({ message: "Email no registrado" });
    }

    //genero un otp
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    //reviso que no este en uso el otp generado
    let result = await Otp.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await Otp.findOne({ otp: otp });
    }

    //guardo el documento en Otp model, el cual tienen un a funcion que enviará el mail
    // const optPayload = ;
    await Otp.create({ email, otp });

    //realizo el res al front
    res
      .status(200)
      .json({ message: "One Time Password enviada exitosamente via mail" });
  } catch (err) {
    console.error("Error el generar el OTP:", err);
    res
      .status(500)
      .json({ message: "Ocurrio un error al genenerar el One Time Password" });
  }
};


export const loginOtp = async (req, res) => {
  // try {
  //   const { otp } = req.body;
  //   //Buscar en Otp model por otp , el que sea mas reciente
  //   const response = await Otp.find({ otp }).sort({createdAt: -1}).limit(1);
  //   if (response.length === 0 || otp !== response[0].otp) {
  //     return res.status(401).json({ message: 'One Time Password inválida o expirada' });
  //   }
  //   const user = await User.findOne({ email: response[0].email });
  //  // Se llama a la funcion que recopila las transferencias "tranfers()"
  //   res.json({
  //     _id: user._id,
  //     first_name: user.first_name,
  //     last_name: user.last_name,
  //     account_type: user.account_type,
  //     account_number: user.account_number,
  //     user_role: user.user_role,
  //     account_balance: user.account_balance,
  //     token: generateToken(user._id),
  //     transfers: await transfers(user),
  //   });
  // } catch (err) {
  //   console.error('Error en login por OTP:', err);
  //   res.status(500).json({ error: 'Ocurrio un error en el login mediante One Time Password' });
  // }
};

//getMe
export const getMe = async (req, res) => {};
