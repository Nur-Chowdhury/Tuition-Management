import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/errorHandler.js';
import User from '../models/User.js';
import { generateTokenAndSetCookie } from '../utils/genTokenAndSetCookies.js';

export const signup = async (req, res, next) => {
    const {
        userType,
        name,
        email,
        inst,
        department,
        password,
    } = req.body;

    if(userType === 'tutor' && (!inst || !department || inst === '' || department === '')){
        next(errorHandler(400, 'All fields are required'))
    }

    if (
        !name ||
        !email ||
        !password ||
        name === '' ||
        email === '' ||
        password === ''
    ) {
        next(errorHandler(400, 'All fields are required'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        userType,
        name,
        email,
        password: hashedPassword,
    });

    if(userType === 'tutor'){
        newUser.educationalInstitution = inst;
        newUser.department = department;
    }
    try {
        await newUser.save();
        res.json('Signup successful');
    } catch (error) {
        next(error);
    }
}

export const signin = async (req, res, next) => {
    const {email, password} = req.body;
  
    if (!email || !password || email === '' || password === '') {
      next(errorHandler(400, 'All fields are required'));
    }
  
    try {
        const validUser = await User.findOne({email});
    
        if(!validUser){
            return next(errorHandler(401, 'Invalid Credintials!'));
        }
    
        const validPass = bcryptjs.compareSync(password, validUser.password);
    
        if (!validPass) {
            return next(errorHandler(401, 'Invalid Credintials!'));
        }
    
        generateTokenAndSetCookie(res, validUser._id, validUser.userType);
        
        const {password: pass, ...rest} = validUser._doc;
        res.status(200).json(rest);  
    } catch (error) {
        next(error);
    }
}

export const signout = (req, res, next) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(0)
        });
        res.status(200).json('Logout successful');
    } catch (error) {
        next(error);
    } 
}