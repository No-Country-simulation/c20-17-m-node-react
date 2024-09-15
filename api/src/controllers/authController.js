import User from "../models/user.js";
import Transfer from "../models/transfer.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

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
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789-.';


    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));

    }
    return result;
  }

  if (first_name && last_name) {
    // alias = `${first_name.charAt(0)}.${last_name.substring(0, Math.min(last_name.length, 8))}`;
    alias = `${first_name.charAt(0)}${last_name.substring(0, Math.min(last_name.length, 8))}.noabank`;

    //agregamos caracteres aleatorios hasta completar la longitud deseada
    while (alias.length < 6) {
      alias += generateRandomString(1);
    }
  } else {
    alias = `${first_name.substring(0, Math.min(first_name.length, 8))}.noabank`;
    //agregamos caracteres aleatorios hasta completar la longitud deseada
    while (alias.length < 6) {
      alias += generateRandomString(1);
    }
  }
  // return alias;
  return alias.toLowerCase()
}

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
      message: "Su cuenta ha sido creada exitosamente.",
      /* _id: user._id,
      first_name: user.first_name,
      token: generateToken(user._id), */
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//loginUser version nueva
export const loginUser = async (req, res) => {
  const data = req.body;
  try {
    const user = await User.findOne({ email: data.email });

    if (user && (await user.matchPassword(data.password))) {
      // Agregar las transferencias
      const transfers = await Transfer.aggregate([
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

      res.json({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        account_type: user.account_type,
        account_number: user.account_number,
        user_role: user.user_role,
        account_balance: user.account_balance,
        token: generateToken(user._id),
        transfers,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//updateUser para actualizar la vista home
export const updateUser = async (req, res) => {
  const {_id } = req.body;
  try {
    const user = await User.findById({_id });

    
      // Agregar las transferencias
      const transfers = await Transfer.aggregate([
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

      res.json({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        account_type: user.account_type,
        account_number: user.account_number,
        user_role: user.user_role,
        account_balance: user.account_balance,
        token: generateToken(user._id),
        transfers,
      });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//loginUser version anterior
// export const loginUser = async (req, res) => {
//   const data = req.body;
//   try {
//     const user = await User.findOne({ email: data.email });

//     if (user && (await user.matchPassword(data.password))) {
//       res.json({
//         _id: user._id,
//         first_name: user.first_name,
//         last_name: user.last_name,
//         account_type: user.account_type,
//         account_number: user.account_number,
//         user_role: user.user_role,
//         account_balance: user.account_balance,
//         token: generateToken(user._id),
//         // vinculo a coleccion de transferencias
//       });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

//getMe
export const getMe = async (req, res) => {};
