import User from "../models/user.model.js"
import Packages from "../models/package.model.js"
import Office from "../models/office.model.js"

export const test = (req, res) => {
    res.json({
        message: 'Api route is working',
    })
}

// GM call
export const gmUsers = async (req, res) => {
    try {
        const users = await User.find({type: /Manager/i}, "id username email type fullname officeCode", {skip: 1});
        res.status(200).json({
            users: users,
        })
    } catch (err) { 
        res.status(404).json({
            message: err.message,
        })
    }
}

export const gmDeleteUser = async (req, res) => {
    console.log(req.body);
    try {
        const _id = req.body;
        if(!_id) 
            return res.status(400).json({ message: "Missing _id" })
        const length = _id.length;
        for(let i = 0; i < length; i++) {
            await User.findOneAndDelete({ _id: _id });
        }
        res.status(200).json({
            message: "User deleted successfully",
        })
    } catch (err) {
        res.status(404).json({
            message: err.message,
        })
    }
}

export const gmPackages = async (req, res) => {
    try {
        const packages = await Packages.find();
        res.status(200).json({
            packages: packages,
        })
    } catch (err) { 
        res.status(404).json({
            message: err.message,
        })
    }
}

export const gmOffices = async (req, res) => {
    try {
        const offices = await Office.find();
        res.status(200).json({
            offices: offices,
        })
    } catch (err) { 
        res.status(404).json({
            message: err.message,
        })
    }
}

// WM call
export const wmUsers = async (req, res) => {
    try {
        const users = await User.find({type: /Employee/i, officeCode: req.params.id}, "id username email type fullname officeCode");
        res.status(200).json({
            users: users,
        })
    } catch (err) { 
        res.status(404).json({
            message: err.message,
        })
    }
}

export const wmDeleteUser = async (req, res) => {
    console.log(req.body);
    try {
        const _id = req.body;
        if(!_id) 
            return res.status(400).json({ message: "Missing _id" })
        const length = _id.length;
        for(let i = 0; i < length; i++) {
            await User.findOneAndDelete({ _id: _id });
        }
        res.status(200).json({
            message: "User deleted successfully",
        })
    } catch (err) {
        res.status(404).json({
            message: err.message,
        })
    }
}   

export const wmPackages = async (req, res) => {
    try {
        const packages = await Packages.find();
        res.status(200).json({
            packages: packages,
        })
    } catch (err) { 
        res.status(404).json({
            message: err.message,
        })
    }
}

// om call

export const omUsers = async (req, res) => {
    try {
        const users = await User.find({type: /Office Employee/i, officeCode: req.params.id}, "id username email type fullname officeCode");
        res.status(200).json({
            users: users,
        })
    } catch (err) { 
        res.status(404).json({
            message: err.message,
        })
    }
}

export const omDeleteUser = async (req, res) => {
    console.log(req.body);
    try {
        const _id = req.body;
        if(!_id) 
            return res.status(400).json({ message: "Missing _id" })
        const length = _id.length;
        for(let i = 0; i < length; i++) {
            await User.findOneAndDelete({ _id: _id });
        }
        res.status(200).json({
            message: "User deleted successfully",
        })
    } catch (err) {
        res.status(404).json({
            message: err.message,
        })
    }
}

export const omPackages = async (req, res) => {
    try {
        const packages = await Packages.find();
        res.status(200).json({
            packages: packages,
        })
    } catch (err) { 
        res.status(404).json({
            message: err.message,
        })
    }
}

// WE call

export const wePackages = async (req, res) => {
    if (req.params.id) {
        const currentOffice = req.params.id;
        try {
            const packages = await Packages.find({currentOffice});
            res.status(200).json({
                packages: packages,
            })
        } catch (err) { 
            res.status(404).json({
                message: err.message,
            })
        }
    }
}

export const weSendPackage = async (req, res) => {
    // console.log(req.body);
    const {packageId, currentOffice} = req.body;
    const deliveryStatus = "Moved to warehouse";
    const receivedDate = null;

    try {
        await Packages.findOneAndUpdate({packageId: packageId}, {currentOffice, deliveryStatus, receivedDate}, {new: true});
        res.status(200).json({
            message: "Package sent successfully",
        })
    } catch (err) {
        res.status(404).json({
            message: err.message,
        })
    }
}

export const weTransferPackage = async (req, res) => {
    const {packageId, currentOffice} = req.body;
    const deliveryStatus = "Transfer to office";
    const receivedDate = null;

    try {
        await Packages.findOneAndUpdate({packageId: packageId}, {currentOffice, deliveryStatus, receivedDate}, {new: true});
        res.status(200).json({
            message: "Package sent successfully",
        })
    } catch (err) {
        res.status(404).json({
            message: err.message,
        })
    }
}


// OE call

export const oePackages = async (req, res) => {
    if (req.params.id) {
        const currentOffice = req.params.id;

        try {
            const packages = await Packages
            .find({currentOffice}, "packageId sender fromLocation receiver toLocation currentOffice packageType totalValue weight deliveredDate shippingCost cashOnDelivery receivedDate notes deliveryStatus")

            res.status(200).json({
                packages: packages,
            })
        } catch (err) { 
            res.status(404).json({
                message: err.message,
            })
        }
    }
}

export const oeCreatePackages = async (req, res) => {
    const {sender, fromLocation, receiver, toLocation, currentOffice, packageType, totalValue, weight, shippingCost, cashOnDelivery, notes} = req.body;
    const deliveredDate = Date.now();
    const receivedDate = null;
    const deliveryStatus = "In transit";
    const packageId = 1 + Math.floor(Math.random() * 1000000);

    const newPackage = new Packages({
        packageId, sender, fromLocation, receiver, toLocation, currentOffice, packageType, totalValue, weight, deliveredDate, shippingCost, cashOnDelivery, receivedDate, notes, deliveryStatus
    })

    try {
        await newPackage.save();
        res.status(201).json({
            message: "Package created successfully",   
        })
    } catch (err) { 
        res.status(404).json({
            message: err.message,
        })
    }
}

export const oeSendPackage = async (req, res) => {
    console.log(req.body);
    const {packageId, currentOffice} = req.body;
    const deliveryStatus = "Moved to warehouse";
    const receivedDate = null;

    try {
        await Packages.findOneAndUpdate({packageId: packageId}, {currentOffice, deliveryStatus, receivedDate}, {new: true});
        res.status(200).json({
            message: "Package sent successfully",
        })
    } catch (err) {
        res.status(404).json({
            message: err.message,
        })
    }
}

export const oeReceivePackage = async (req, res) => {
    console.log(req.body);
    const {packageId, currentOffice} = req.body;
    const deliveryStatus = "Received at office";
    const receivedDate = null;

    try {
        await Packages.findOneAndUpdate({packageId: packageId}, {currentOffice, deliveryStatus, receivedDate}, {new: true});
        res.status(200).json({
            message: "Package receive successfully",
        })
    } catch (error) {
        res.status(404).json({
            message: err.message,
        })
    }
}

export const oeDeliverPackage = async (req, res) => {
    const {packageId, deliveryStatus} = req.body;
    const receivedDate = null;

    try {
        await Packages.findOneAndUpdate({packageId: packageId}, {deliveryStatus, receivedDate}, {new: true});
        res.status(200).json({
            message: deliveryStatus,
        })
    } catch (error) {
        res.status(404).json({
            message: error.message,
        })
    }
}
