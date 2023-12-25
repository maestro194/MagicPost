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
        const users = await User.find({type: /Manager/i}, null, {skip: 1});
        res.status(200).json({
            users: users,
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