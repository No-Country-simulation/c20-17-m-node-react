const mongoose = require ('mongoose')



const transfer = new mongoose.Schema({

    transfer_id:{
        type: String,
        required: true,
        minlength: 3,

    },
    mount:{
        type: String,
        required: true,
        minlength: 3,

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
    

})