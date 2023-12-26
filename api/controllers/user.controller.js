import User from "../models/user.model.js"
import Packages from "../models/package.model.js"

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