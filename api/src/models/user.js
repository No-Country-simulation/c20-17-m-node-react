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


userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User',userSchema)
module.exports = User