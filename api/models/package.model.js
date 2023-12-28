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

    currentOffice: {
        type: Number,
        required: true,
    },

    packageType: {
        type: String,
        required: true,
    },

    totalValue: {
        type: String,
        required: true,
    },

    weight: {
        type: String,
        required: true,
    },

    deliveredDate: {
        type: Date,
    },

    shippingCost: {
        type: String,
        required: true,
    },

    cashOnDelivery: {  
        type: String,
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