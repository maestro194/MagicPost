import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema(
{
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  }
},{
  timestamps: true,
});

const Warehouse = mongoose.model("Warehouse", warehouseSchema);

export default Warehouse;