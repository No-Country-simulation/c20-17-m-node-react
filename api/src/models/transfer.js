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
        type: String,
        required: true,
        minlength: 3,

    },
    receptor_id:{
        type: String,
        required: true,
        minlength: 3,

    },
    createtAt: {
        type: Date,
        default: Date.now,
    },
})