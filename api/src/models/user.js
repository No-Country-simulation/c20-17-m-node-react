import { mongoose } from "mongoose";
import { bcrypt } from "bcryptjs";

const userSchema = new mongoose.Schema({

    first_name:{
        type: String,
        required: true,
        minlength: 3,

    },
    last_name:{
        type: String,
        required: true,
        minlength: 3,

    },
    email:{
        type: String,
        required: true,
        unique: true,
    },

    password:{
        type: String,
        required: true,
        minlength: 8,
    },
    role:{
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
    user_account_1:{
        type: String,
       
    },
    user_account_2:{
        type: String,
       
    },user_account_3:{
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
export default User;