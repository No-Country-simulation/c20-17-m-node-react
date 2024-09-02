import { mongoose } from "mongoose";
import  bcrypt  from "bcryptjs";

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
    date_of_birth:{
        type: Date,
        // required: true,
        
    },
    phone:{
        type: Number,
        required: true,
        
    },
    address:{
        type: String,
        required: true,
        
    },
    user_role:{
        type: String,
        default: 'user',
    },
    account_type: {
        type: String,
        default: "personal_account"
        //personal_account or company_account
    },
    account_number:{
        type: Number,
       
    },
    account_balance: {
        type: Number,
        default: 157000
    }
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