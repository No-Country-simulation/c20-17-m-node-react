import { mongoose } from "mongoose";

const transferSchema = new mongoose.Schema({
  mount: {
    type: Number,
    required: true,
  },
  emisor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receptor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Transfer = mongoose.model("Transfer", transferSchema);

export default Transfer;
