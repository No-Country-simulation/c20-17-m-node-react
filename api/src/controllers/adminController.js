import Transfer from "../models/transfer.js";
import User from "../models/user.js";

// const adminHome = async (req, res) => {};

// const adminSearch = async (req, res) => {};

const adminUpdateUser = async (req, res) => {

    const { _id , 
            first_name,
            last_name,
            email,
            phone,
            account_balance,
            isActive} = req.body

    const toUpdate = {
        first_name,
        last_name,
        email,
        phone,
        account_balance,
        isActive
    }

    try {

        await User.findByIdAndUpdate(_id, toUpdate)

        res.status(200).json({message: 'Datos de usuario actualizado exitosamente'});
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export { adminUpdateUser };
