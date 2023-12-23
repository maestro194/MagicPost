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
    type: String,
    required: true,
  },
  toLocation: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
    
}, {
  timestamps: true
})

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;