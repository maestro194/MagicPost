import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'

export const signup = async (req, res, next) => {
    console.log(req.body);

    const {username, email, password, type} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, password: hashedPassword, email, type});

    try {
        await newUser.save();
        res.status(201).json("User create successfully")
    } catch(error) {
        next(error)
    }

}