import Transfer from "../models/transfer.js";
import User from "../models/user.js";

const transferSave = async (req, res) => {
    const { mount, emisor_id, receptor_id } = req.body;
    // const data = req.body

    try {
        //Obtengo los usuarios
        const emisor = await User.findById(emisor_id);
        const receptor = await User.findById(receptor_id);

        if(!emisor || !receptor) {
            return res.status(404).json({message: 'Usuario no encontrado'});
        }

        //Verifico saldo y actualizar
        await emisor.updateBalance(mount, false); //Restar al emisor

        //Actualizo account_balance del receptor
        await receptor.updateBalance(mount, true); //Sumar al receptor
        
        //Creo la transferencia
        const transfer = new Transfer({
            emisor_id: emisor._id,
            receptor_id: receptor._id,
            mount
        })

        await transfer.save();

        res.status(201).json({message: 'Transferencia exitosa.'})
        
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error al realizar la transferencia'});
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