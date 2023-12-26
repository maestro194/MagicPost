import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
    packageId: {
        type: String,
        required: true,
    },

    sender: {
        type: String, 
        required: true,
    },

    fromLocation: {
        type: String,
        required: true,
    },

    receiver: {
        type: String,
        required: true,
    },

    toLocation: {
        type: String,
        required: true,
    },

    packageType: {
        type: String,
        required: true,
    },

    totalValue: {
        type: Number,
        required: true,
    },

    weight: {
        type: Number,
        required: true,
    },

    deliveredDate: {
        type: Date,
    },

    shippingCost: {
        type: Number,
        required: true,
    },

    cashOnDelivery: {  
        type: Number,
        required: true,
    },

    receivedDate: {
        type: Date,
    },

    notes: {
        type: String,
    },

    deliveryStatus: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

const Package = mongoose.model('Package', packageSchema);

export default Package;