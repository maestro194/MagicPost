import mongoose from "mongoose";

const officeSchema = new mongoose.Schema({
  
}, {
    timestamps: true
})

const Office = mongoose.model('Office', officeSchema);

export default Office;