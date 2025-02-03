import User from '../models/User.js';
import Ad from "../models/Ad.js";


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


export const search = async (req, res) => {
    const { searchTerm, type, subType, sort, order } = req.query;


    try {
        let results = [];
        const query = {};
        const sortQuery = {};

        if (sort && order) {
            sortQuery[sort] = order === 'desc' ? -1 : 1;
        }

        if (type === 'tutor') {
            if (subType === 'name') {
                query.userType = 'tutor';
                query.name = { $regex: searchTerm, $options: 'i' };
            } else if (subType === 'topic') {
                query.userType = 'tutor';
                query.interestedTopics = { $regex: searchTerm, $options: 'i' };
            } else if (subType === 'instituition') {
                query.userType = 'tutor';
                query.educationalInstitution = { $regex: searchTerm, $options: 'i' };
            }
            results = await User.find(query).sort(sortQuery).exec();
        } else if (type === 'guardian') {
            query.userType = 'guardian';
            query.name = { $regex: searchTerm, $options: 'i' };
            results = await User.find(query).sort(sortQuery).exec();
        } else if (type === 'post') {
            query.slug = { $regex: searchTerm, $options: 'i' };
            results = await Ad.find(query).sort(sortQuery).exec();
        }
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};