const mongoose = require ('mongoose')



const transfer = new mongoose.Schema({

    // transfer_id:{
    //     type: String,
    //     required: true,
    //     minlength: 3,

    // },
    mount:{
        type: Number,
        required: true,

    },
    emisor_id:{
        type: [
            {
                emisor: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                }
            }
        ],
        default: []
    
    },
    receptor_id:{
        type: [
            {
                receptor: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                }
            }
        ]

    },
    createtAt: {
        type: Date,
        default: Date.now,
    },
})