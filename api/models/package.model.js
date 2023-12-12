import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    accountType: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const Package = mongoose.model('Package', packageSchema);

export default Package;