import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    uid : {
        type: String,
        required: true,
        unique: true,
    },

    referralCode : {
        type: String,
        required: true,
        unique: true,
    },

    name : {
        type: String,
        required: true,
    },



} , {timestamps : true});

const User = mongoose.model('User', userSchema);

export default User;