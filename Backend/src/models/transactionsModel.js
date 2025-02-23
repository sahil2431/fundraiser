import mongoose from "mongoose";


const transactionsSchema = new mongoose.Schema({
    referralCode : {
        type : String,
        required : true
    },

    amount : {
        type : Number,
        required : true
    },

    payeeDetails : {
        email : {
            type : String,
            required : true
        },
        name : {
            type : String,
            required : true
        },

        phone : {
            type : String,
        }
    },


    transactionID : {
        type : String,
        required : true
    },
} , {timestamps : true});

const Transactions = mongoose.model('Transactions', transactionsSchema);

export default Transactions;