import mongoose from "mongoose";

const officeSchema = new mongoose.Schema({
    officeCode: {
        type: Number,
        required: true,
        unique: true,
    },
    officeName: {
        type: String, 
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const Office = mongoose.model('Office', officeSchema);

export default Office;