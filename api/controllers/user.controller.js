import User from "../models/user.model"

export const test = (req, res) => {
    res.json({
        message: 'Api route is working',
    })
}

export const gmHome = (req, res) => {
    res.json({
        message: 'GM Home',
    })
}

export const gmUsers = async (req, res) => {
    const {userTyoe} = "wm"

    try {
        while (true) {
            const user = await User.findOne({type: userType})
            if(!user)
                break;
            res.json(user)   
        }
    } catch (error) {
        next(error)
    }
    res.json({
        message: 'GM Users',
    })
}