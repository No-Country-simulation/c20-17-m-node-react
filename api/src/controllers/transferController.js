import Transfer from "../models/transfer.js";

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

export { transferSave }