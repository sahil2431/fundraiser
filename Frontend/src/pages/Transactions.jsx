import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { getTransactions } from '../features/api/transaction'
import { toast } from 'react-toastify'
import { Loader2 } from 'lucide-react'

const Transactions = () => {
  const {isLoggedIn , user} = useSelector(state => state.authUser)
  const [transactions , setTransactions] = useState([])
  const [isLoading , setIsLoading] = useState(true)

  useEffect(() => {
    const getAllTransaction = async () => {
      const data = await getTransactions(user?.uid)

      if(data.success) {
        setTransactions(data.transactions)
      }else {
        toast.error('Error in fetching transactions. Kindly refresh')
      }
      setIsLoading(false)
    }

    getAllTransaction()
  } , [user])

  const navigate = useNavigate()
  if(!isLoggedIn){
    navigate('/')
  }

  if(isLoading) return <Loader2 className='mx-auto mt-10 animate-spin' size={64} />
  return (
    <div className="md:ml-64 p-10 mx-auto sm:p-6 bg-white rounded-2xl shadow-lg mt-10">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-sm sm:text-base">
              <th className="py-2 px-2 sm:px-4 border-b">ID</th>
              <th className="py-2 px-2 sm:px-4 border-b">Name</th>
              <th className="py-2 px-2 sm:px-4 border-b">Amount</th>
              <th className="py-2 px-2 sm:px-4 border-b">Transaction Id</th>
              <th className="py-2 px-2 sm:px-4 border-b">Date</th>
              <th className="py-2 px-2 sm:px-4 border-b">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx , index) => (
              <tr key={tx._id} className="hover:bg-gray-50 text-sm sm:text-base">
                <td className="py-2 px-2 sm:px-4 border-b">{index + 1}</td>
                <td className="py-2 px-2 sm:px-4 border-b">{tx.payeeDetails.name}</td>
                <td className="py-2 px-2 sm:px-4 border-b">{tx.amount}</td>
                <td className="py-2 px-2 sm:px-4 border-b">{tx.transactionID}</td>
                
                <td className="py-2 px-2 sm:px-4 border-b">{new Date(tx.createdAt).toLocaleString()}</td>
                <td className="py-2 px-2 sm:px-4 border-b">{tx.payeeDetails.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Transactions
