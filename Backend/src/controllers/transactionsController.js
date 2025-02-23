import Transactions from "../models/transactionsModel.js";
import User from "../models/userModel.js";

const createTransaction = async (req , res) => {
    const {referralCode , amount , payeeDetails , transactionID} = req.body;

    if(!referralCode || !amount || !payeeDetails || !transactionID){
        return res.status(400).json({error : 'All fields are required'});
    }

    try {
        
        const newTransaction = new Transactions({
            referralCode,
            amount,
            payeeDetails,
            transactionID
        });

        await newTransaction.save();

        return res.status(201).json({success : true , message : 'Transaction created successfully' , transaction : newTransaction});
    } catch (error) {
        console.error('Transaction creation failed:', error.message);
        return res.status(500).json({error : 'Server error' , success : false});
    }
}

const getAllTransactions = async (req , res) => {
    const {uid} = req.params;

    if(!uid) {
        return res.status(400).json({
            message : "UID is required",
            success : false
        })
    }

    try {
        const user = await User.findOne({uid});
        if(!user) {
            return res.status(404).json({
                message : "User not found",
                success : false
            })
        }

        const transactions = await Transactions.find({referralCode : user.referralCode});

        return res.status(200).json({transactions , success : true});
    } catch (error) {
        console.error('Transaction fetch failed:', error.message );

        return res.status(500).json({error : 'Server error' , success : false});
    }
}

export {
    createTransaction,
    getAllTransactions
}