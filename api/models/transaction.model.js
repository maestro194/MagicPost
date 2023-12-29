import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  packageId: {
    type: Number,
    required: true,
  },
  fromLocation: {
    type: Number,
    required: true,
  },
  toLocation: {
    type: Number,
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true
})

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;