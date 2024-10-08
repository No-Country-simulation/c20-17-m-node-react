import { mongoose } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    minlength: 2,
  },
  last_name: {
    type: String,
    //required: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  date_of_birth: {
    type: Date,
    // required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  user_role: {
    type: String,
    default: "user",
  },
  account_type: {
    type: String,
    default: "personal_account",
    //personal_account or company_account
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  account_number: {
    type: String,
  },
  account_balance: {
    type: Number,
    //default: 157000,
  },
  alias: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.updateBalance = async function (balance, isDeposit) {
  if(isDeposit) {
    this.account_balance += balance;
  }else {
    if(this.account_balance < balance) {
      // throw new Error('Saldo insuficiente');
      return true;
    }
    this.account_balance -= balance;
  }
  await this.save();
}

const User = mongoose.model("User", userSchema);
export default User;
