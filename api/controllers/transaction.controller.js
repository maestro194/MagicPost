import Transaction from "../models/transaction.model.js";

export const test = (req, res) => {
    res.json({
        message: 'Api route is working',
    })
}

export const createTransaction = async (req, res) => {
    const { packageId, fromLocation, toLocation } = req.body;
    const id = 1 + Math.floor(Math.random() * 1000000);
    var status = "";
    if (toLocation === null) {
        
    } else if (fromLocation === toLocation) {
        status = "Receive package at office " + fromLocation;
    } else {
        status = "Transfer to office " + toLocation;
    }
    const date = Date.now();
    try {
        const newTransaction = new Transaction({id, packageId, fromLocation, toLocation, status, date});
        await newTransaction.save();
        res.status(200).json({
            message: "Transaction created successfully",
        })
    } catch (err) {
        res.status(404).json({
            message: err.message,
        })
    }
}

export const createTransactionStatus = async (req, res) => {
    const { packageId, fromLocation, deliveryStatus } = req.body;
    const id = 1 + Math.floor(Math.random() * 1000000);
    var status = "";
    if (deliveryStatus === "Delivered") {
        status = "Delivered to receiver";
    } else if (deliveryStatus === "Out for Delivery") {
        status = "Out for delivery";
    } else if (deliveryStatus === "Not Delivered") {
        status = "Not delivered";
    } else 
        status = "On hold";

    const date = Date.now();
    try {
        const newTransaction = new Transaction({id, packageId, fromLocation, status, date});
        await newTransaction.save();
        res.status(200).json({
            message: "Transaction created successfully",
        })
    } catch (err) {
        res.status(404).json({
            message: err.message,
        })
    }
}

export const getFromTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({fromLocation: req.params.id});
        res.status(200).json({
            transactions: transactions,
        })
    } catch (err) {
        res.status(404).json({
            message: err.message,
        })
    }
}

export const getToTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({toLocation: req.params.id, fromLocation: {$ne: req.params.id}});
        res.status(200).json({
            transactions: transactions,
        })
    } catch (err) {
        res.status(404).json({
            message: err.message,
        })
    }
}

export const getTransaction = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const transaction = await Transaction.find({packageId: id});
        res.status(200).json({
            transaction: transaction,
        })
    } catch (err) {
        res.status(404).json({
            message: err.message,
        })
    }
}