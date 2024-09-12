import Transfer from "../models/transfer.js";
import User from "../models/user.js";

const transferSave = async (req, res) => {
    // const { mount, emisor_id, receptor_id } = req.body;
    const data = req.body

    try {
        await Transfer.create(data);

        res.status(201).json({message: 'Transferencia exitosa.'})
        
    } catch (err) {
        res.status(500).json({message: err.message});
    }

}

const searchUser = async (req, res) => {
    const { searchQuery } = req.body;

    try {
         const user = await User.findOne({ account_number: searchQuery })
            .select(["_id", "first_name","last_name", "account_number"]);

        if (!user) {
            return res.status(404).json({ message: 'Destinatario no encontrado' });
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al buscar destinatario' });
    }
}

export { transferSave, searchUser }