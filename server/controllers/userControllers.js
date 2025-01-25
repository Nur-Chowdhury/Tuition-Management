import User from '../models/User.js';


export const findUserById = async (req, res, next) => { 
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        const {password: pass, ...rest} = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error); 
    }
}

export const updateUser = async (req, res, next) => {
    const id = req.user.userId; 
    const {row, data} = req.body;
    try {
        const user = await User.findById(id);
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            {
                [row]: data,
            },
            {new: true}
        );
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}