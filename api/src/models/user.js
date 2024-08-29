const mongoose = require ('mongoose')



const userSchema = new mongoose.Schema({

    username:{
        type: String,
        required: true,
        minlength: 3,

    },
    email:{
        type: String,
        required: true,
        
    },

    password:{
        type: String,
        required: true,
        minlength: 8,
    },
    user_type:{
        type: String,
        required: true,
        default: 'user',
    },
    birthday:{
        type: Date,
        required: true,
        
    },
    phone:{
        type: Number,
        required: true,
        
    },
    adress:{
        type: String,
        required: true,
        
    },

    user_account:{
        type: String,
       
    },


})