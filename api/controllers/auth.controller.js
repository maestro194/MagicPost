import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    console.log(req.body);

    const {username, email, password, fullname, type} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, password: hashedPassword, email, fullname, type});

    try {
        await newUser.save();
        res.status(201).json("User create successfully")
    } catch(error) {
        next(error)
    }
}

export const signin = async (req, res, next) => {
    console.log(req.body);

    // add account type later
    const {username, password} = req.body;

    try {
        const validUsername = await User.findOne({username: username});
        if(!validUsername) 
            return next(errorHandler(404, 'User not found!'));
        const validPassword = bcryptjs.compareSync(password, validUsername.password);
        if(!validPassword)
            return next(errorHandler(401, 'Invalid username or password!'));
        const token = jwt.sign({id: validUsername._id}, process.env.JWT_SECRET);
        const {password: pwd, ...rest} = validUsername._doc;
        res
            .cookie('access_token', token, {httpOnly: true})
            .status(200)
            .json(rest);
    } catch(error) {
        next(error)
    }
}

export const signout = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User signout successfully');
    } catch(error) 
        next(error);
    }
}