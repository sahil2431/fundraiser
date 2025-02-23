import axiosInstance from "../../utils/axios";

export const donation = async (data) => {
    try {
        const response = await axiosInstance.post('/transactions/donate' , data)
        console.log(response)
        return response.data;
    } catch (error) {
        return error.response.data;
        
    }
}

export const getTransactions = async (uid) => {
    try {
        console.log(uid)
        const response = await axiosInstance.get(`/transactions/getAll/${uid}`)
        return response.data
    } catch (error) {
        return error.response.data
    }
}