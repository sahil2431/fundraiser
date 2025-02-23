import User from "../models/userModel.js";
import crypto from "crypto";

const generateReferralCode = () => {
    return crypto.randomBytes(6).toString('hex');
}
const userLogin = async (req , res) => {
    const {uid , name } = req.body.user;

    if(!uid || !name){
        return res.status(400).json({error : 'All fields are required'});
    }

    try {
        const user = await User.findOne({uid});
        if(user){
            return res.status(200).json({message : 'User already exists' , user});
        }

        const newUser = new User({
            uid,
            name,
            refferalCode : generateReferralCode()
        });

        await newUser.save();

        return res.status(201).json({message : 'User created successfully' , user : newUser});

        
    } catch (error) {
        console.error('User login failed:', error.message);
        return res.status(500).json({error : 'Server error'});
    }
}

const getRefferalCode = async (req , res) => {
    const {uid} = req.body;
    if(!uid){
        return res.status(400).json({error : 'All fields are required'});
    }

    try {
        const user = await User.findOne({uid});
        if(!user){
            return res.status(404).json({error : 'User not found'});
        }

        return res.status(200).json({referralCode : user.referralCode});
    } catch (error) {
        console.error('Refferal code fetch failed:', error.message);
        return res.status(500).json({error : 'Server error'});
    }
}

export { userLogin , getRefferalCode  };